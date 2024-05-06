import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function useForm(steps) {
    const [currentStep, setCurrentStep] = useState(0)
    const navigate = useNavigate();

    function changeStep(i, e) {
        console.log(e);
        console.log(i)
        if (e) e.preventDefault();

        if(i === -1){
            navigate(-1)
        }

        if (i < 0 || i >= steps.length) return

        setCurrentStep(i)
    }

    return {
        currentStep,
        currentComponent: steps[currentStep],
        changeStep,
        isLastStep: currentStep + 1 === steps.length ? true : false,
    }

}