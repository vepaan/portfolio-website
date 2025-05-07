'use client'

import React, {useState, useEffect, useRef} from 'react';
import ThreeDSim from './3dsim';
import Greetings from './greetings';

export default function MainPage() {

    return (
        <div>
            <Greetings />
            <ThreeDSim />
        </div>
    )
}