import {
    type fullUser,
    logInRequest,
    registerRequest,
    getMe,
} from "../services/AuthService.ts";

async function test(){
    const username = "yuri";
    const password = "hello";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl1cmkiLCJpZCI6IjZhODFhNmJkZTMxMGM5ZTYzZGI3NmU5NiIsImlhdCI6MTc4Njg4MTc2MywiZXhwIjoxNzg3NDg2NTYzfQ.EHSLaaDbZqDUKmO-zILSTBjkmuxu7cEHBOvmJWdLDMg";

    // const data = await logInRequest(username, password);
    // console.log(data);

    const user = await getMe(token);
    console.log(user);

}
await test()
