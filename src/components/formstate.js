"use client";

import React from "react";
import { useFormState } from "react-dom";

export default function FormStateMessage({ formActionFunction, formStateMessage }) {
    const [formState, action] = useFormState(formActionFunction, {
        message: formStateMessage,
    });
    return <span className="font-bold">{formState.message}</span>;
}
