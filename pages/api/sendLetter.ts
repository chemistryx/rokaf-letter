import axios, { AxiosError } from "axios";
import { AXIOS_HEADER_UA, ROKAF_SEND_LETTER } from "constants/general";
import { Agent } from "https";
import { NextApiRequest, NextApiResponse } from "next";
import parse from "node-html-parser";
import qs from "qs";

interface LetterApiRequest extends NextApiRequest {
    body: {
        traineeId: number;
        senderName: string;
        relationship: string;
        title: string;
        content: string;
        password: string;
    }
}

export default async function handler(req: LetterApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { data } = await axios.post(ROKAF_SEND_LETTER, qs.stringify({
                siteId: "last2",
                command2: "writeEmail",
                memberSeqVal: req.body.traineeId,
                senderName: req.body.senderName,
                relationship: req.body.relationship,
                title: req.body.title,
                contents: req.body.content,
                password: req.body.password
            }), {
                headers: { "User-Agent": AXIOS_HEADER_UA },
                httpsAgent: new Agent({ rejectUnauthorized: false })
            });

            console.log(data);

            const parsed = parse(data).querySelector("div.message");

            if (parsed?.innerText === "정상적으로 등록되었습니다.") {
                res.status(200).json({ status: true });
            } else {
                res.status(500).json({ status: false, message: "전송 과정에서 오류가 발생하였습니다." });
            }
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                res.status(500).json({ status: false, message: e.message });
            } else {
                res.status(500).json({ status: false, message: JSON.stringify(e) });
            }
        }
    } else {
        res.status(405).json({ status: false, message: "Method Not Allowed" });
    }
}
