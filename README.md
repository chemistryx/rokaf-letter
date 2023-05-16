# rokaf-letter
공군 인터넷 편지 작성 절차를 간략하게 만들어주는 웹 서비스입니다.


데모는 [이곳](https://h.suhan.io)에서 보실 수 있습니다.

## Setup
1. `config.sample.json`파일을 참고하여 `config.json`파일을 생성한 후, 내용을 입력합니다.
2. 정상적으로 적용된 경우, 훈련병 검색이 가능하고 설정한 날짜가 지난 경우 Form 및 제출 버튼이 자동으로 활성화됩니다.

## Running
```sh
npm install && npm run dev
```

## Deploying
`참고` PM2 환경이 미리 설정되어 있어야 합니다.
1. 아래 명령어를 입력하여 애플리케이션을 빌드합니다.
```sh
npm run build
```
2. PM2를 통해 애플리케이션을 실행합니다.
```sh
pm2 start npm --name "rokaf-letter" -- start
```

## API Endpoints
`GET` `/api/getTrainee`
> 편지 전송에 필요한 훈련병 ID를 반환합니다.

**Parameters**
|이름|설명|
|--|--|
|name|훈련병 이름|
|birth|훈련병 생일 (YYYYMMDD)|

**Response**
```json
{
    "status": true,
    "traineeId": 111111111
}
```


`POST` `/api/sendLetter`
> 편지를 전송합니다.

**Request Body**
```json
{
    "traineeId": "훈련병 ID",
    "senderName": "발신자 이름",
    "relationship": "훈련병과의 관계",
    "title": "제목",
    "content": "내용",
    "password": "비밀번호"
}
```

**Response**
```json
{
    "status": true
}
```

## Disclaimer
해당 서비스를 사용함으로써 발생하는 문제에 대한 책임은 전적으로 사용자에게 있습니다.
