import { FadeLoader } from "react-spinners";

export default function Loading() {


    const override = {
        display: "block",
        margin: "0 auto",
        color: "#3ae23a",
        borderColor: "green",
    };



    return (<>


        <div className="sweet-loading flex justify-center items-center h-96">
            <FadeLoader
            color={"#3ae23a"}
                cssOverride={override}
                size={150}
                
                aria-label="Loading Spinner"
                data-testid="loader"
            />

        </div>
    </>

    )
}
