import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useLoader } from "./LoaderContext";

const Spinner = () => {

    const { isLoading } = useLoader();

    return (
        <Dimmer active={isLoading}>
            <Loader active={isLoading} />
        </Dimmer>
    )
}

export default Spinner;