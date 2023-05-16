import { ArrowLeft, NotSentFilled, SendAltFilled } from "@carbon/icons-react";
import Card from "components/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/pages/Complete.module.scss";
import config from "../config.json";
import moment from "moment";

type Data = {
    icon: React.ReactNode,
    title: string,
    description: React.ReactNode,
};

const successData: Data = {
    icon: <SendAltFilled size={32} />,
    title: "편지를 보냈습니다.",
    description: <>전달 여부는 아래 정보를 통해 <Link href="https://www.airforce.mil.kr/user/indexSub.action?codyMenuSeq=156893223&siteId=last2" target="_blank">공군 기본군사훈련단</Link>에서 확인하실 수 있어요.</>,
};

const failureData: Data = {
    icon: <NotSentFilled size={32} />,
    title: "편지 전송 중 오류가 발생했습니다.",
    description: <>아래 정보를 통해 <Link href="https://www.airforce.mil.kr/user/indexSub.action?codyMenuSeq=156893223&siteId=last2" target="_blank">공군 기본군사훈련단</Link>에서 직접 작성해주세요.</>,
};

function Complete() {
    const router = useRouter();
    const { state, message } = router.query;
    const data = state === "success" ? successData : failureData;

    return (
        <div className={styles.base}>
            <Card center>
                <div className={styles.iconWrapper}>{data.icon}</div>
                <h2 className={styles.title}>{data.title}</h2>
                {message &&
                    <p className={[styles.description, styles.error].join(" ")}>{message}</p>
                }
                <p className={styles.description}>{data.description}</p>
                <div className={styles.infoWrapper}>
                    <p>교육생 이름: {config.trainee.name}</p>
                    <p>교육생 생년월일: {moment(config.trainee.birth).format("YYYY년 MM월 DD일")}</p>
                </div>
                <div className={styles.footer}>
                    <Link href="/"><ArrowLeft />돌아가기</Link>
                </div>
            </Card >
        </div >
    );
}

export default Complete;
