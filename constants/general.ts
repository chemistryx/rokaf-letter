export const ROKAF_BASEURL = "https://www.airforce.mil.kr/user";
export const ROKAF_GET_TRAINEE_ID = ROKAF_BASEURL + "/emailPicViewSameMembers.action";
export const ROKAF_SEND_LETTER = ROKAF_BASEURL + "/emailPicSaveEmail.action";

export const AXIOS_HEADER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

export type ResponseBase = {
    status: boolean;
    message?: string;
};
