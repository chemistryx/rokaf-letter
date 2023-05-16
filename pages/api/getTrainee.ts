import axios, { AxiosError } from "axios";
import { AXIOS_HEADER_UA, ROKAF_GET_TRAINEE_ID, ResponseBase } from "constants/general";
import { Agent } from "https";
import { NextApiRequest, NextApiResponse } from "next";
import parse from "node-html-parser";

export type TraineeResponse = ResponseBase & {
    traineeId?: number
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<TraineeResponse>) {
    const { name, birth } = req.query;

    try {
        const { data } = await axios.get(ROKAF_GET_TRAINEE_ID, {
            params: {
                siteId: "last2",
                searchName: name,
                searchBirth: birth
            },
            headers: { "User-Agent": AXIOS_HEADER_UA },
            httpsAgent: new Agent({ rejectUnauthorized: false }),
        });

        const parsed = parse(data).querySelector("input[type=\"button\"].choice");

        if (!parsed) {
            res.status(404).json({ status: false, message: "훈련병 정보가 존재하지 않습니다." });
        } else {
            const id = Number(parsed.attributes.onclick.match(/(\d+)/)![0]);
            res.status(200).json({ status: true, traineeId: id });
        }
    } catch (e) {
        console.log(e);
        if (e instanceof AxiosError) {
            res.status(500).json({ status: false, message: e.message });
        } else {
            res.status(500).json({ status: false, message: JSON.stringify(e) });
        }
    }
}
