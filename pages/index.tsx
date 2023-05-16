import { CircleDash } from "@carbon/icons-react";
import axios, { AxiosError } from "axios";
import Card from "components/Card";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "styles/pages/Home.module.scss";
import useSWRImmutable from "swr/immutable";
import { TraineeResponse } from "./api/getTrainee";
import config from "../config.json";
import moment from "moment";
import "moment/locale/ko";

const fetcher = (url: string) => axios.get(url, {
    validateStatus(status: number) {
        return (status >= 200 && status < 300) || status == 404;
    }
}).then((res) => res.data);

const CONTENT_MAX_LENGTH = 1200;

function Home() {
    const router = useRouter();
    const [contentLength, setContentLength] = useState(0);
    const { isLoading, data } = useSWRImmutable<TraineeResponse>(`/api/getTrainee?name=${config.trainee.name}&birth=${config.trainee.birth}`, fetcher);
    const notFound = (!isLoading && !data) || !data?.status;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as EventTarget & {
            name: { value: string };
            relationship: { value: string };
            title: { value: string };
            content: { value: string };
            password: { value: string };
        };

        const payload = {
            traineeId: data?.traineeId,
            senderName: target.name.value,
            relationship: target.relationship.value,
            title: target.title.value,
            content: target.content.value,
            password: target.password.value
        };

        let response;
        let message = "";

        try {
            response = await axios.post("/api/sendLetter", payload);
        } catch (e) {
            if (e instanceof AxiosError) message = e.message;
        }

        router.replace({ pathname: "/complete", query: { state: response?.data.status ? "success" : "failure", message: message } }, "/");
    };

    const getMessage = (shorthand = false) => {
        const now = moment();
        const date = moment(config.date);
        const result = now.isBefore(date) ? ["아직 인터넷 편지가 개설되지 않았습니다.", !shorthand ? `개설 예정 일자: ${date.locale("ko").format("LLLL")}` : ""].join("\n") : "훈련병 정보가 존재하지 않습니다.";

        return result;
    }

    const handleClick = (_: React.MouseEvent<HTMLFormElement>) => {
        if (!notFound) return;
        const message = getMessage();
        alert(message);
    }

    const handleContentChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setContentLength(event.currentTarget.textLength);
    };

    return (
        <div className={styles.base}>
            <div className={styles.header}>
                <h1>{config.title}</h1>
            </div>
            <Card>
                {isLoading ?
                    <div className={styles.spinnerWrapper}>
                        <CircleDash size={32} />
                    </div>
                    :
                    <form className={styles.formWrapper} onSubmit={handleSubmit} onClick={handleClick} autoComplete="off">
                        <label htmlFor="name">이름</label>
                        <input id="name" type="text" placeholder="이름을 입력해주세요." maxLength={15} disabled={notFound} required />
                        <label htmlFor="relationship">관계</label>
                        <input id="relationship" type="text" placeholder="관계를 입력해주세요. (예: 친구, 지인 등)" maxLength={15} disabled={notFound} required />
                        <label htmlFor="title">제목</label>
                        <input id="title" type="text" placeholder="제목을 입력해주세요." maxLength={150} disabled={notFound} required />
                        <label htmlFor="content">내용 <span className={styles.counter}>(<span className={styles.highlight}>{contentLength}</span>/{CONTENT_MAX_LENGTH}자)</span></label>
                        <textarea id="content" placeholder="내용은 최대 1200자까지 입력할 수 있어요." onChange={handleContentChange} maxLength={1200} disabled={notFound} required />
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" placeholder="본인만 알 수 있는 비밀번호를 입력해주세요." maxLength={15} disabled={notFound} required />
                        <button type="submit" disabled={notFound}>{notFound ? getMessage(true) : "보내기"}</button>
                    </form>
                }
            </Card>
        </div>
    );
}

export default Home;
