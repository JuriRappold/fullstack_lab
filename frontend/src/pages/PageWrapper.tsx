import {Footer} from "../components/pageComponents/Footer.tsx";
import {NavigationBar} from "../components/pageComponents/NavigationBar.tsx";
import {ProtectedRoute} from "../util/services";

export function PageWrapper({children}){
    return (
        <>
            <ProtectedRoute>
                <NavigationBar />
                <div className={"main safe wrap"}>
                        {children}
                </div>
                <Footer />
            </ProtectedRoute>
        </>
    )
}