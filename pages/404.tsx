import { useRouter } from "next/router";
import { useEffect } from "react";

function Page404() {
    const router = useRouter();

    useEffect(() => {
        router.push("/");
    });
}

export default Page404;
