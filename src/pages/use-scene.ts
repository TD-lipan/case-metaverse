import React, { useCallback } from 'react';
import styles from './index.less';
import { useState } from 'react';
import { useEffect } from 'react';

export enum Scene {
    Login = 1,
    Main = 2,
    CaseProcessing = 3,
    TwoDaysLater = 4
}

export default function (defaultValue?: Scene) {
    const [scene, setScene] = useState<Scene>(defaultValue || Scene.Login);

    const handleKeyPress = (e: any) => {
        const { key, keyCode } = e;
        setScene(prev => {
            let step = 0;
            if (keyCode === 37) {
                step = -1
            }
            if (keyCode === 39) {
                step = 1
            }
            const newValue = prev + step;
            if (newValue > 4 || newValue < 1) return prev;
            return prev + step;
        })
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress, false);
        return () => {
            window.removeEventListener("keydown", handleKeyPress, false);
        }
    }, [handleKeyPress])
    return {
        scene,
        setScene
    }
}
