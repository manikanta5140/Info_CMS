
import React, { useEffect, useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function SeverityDemo() {
    const msgs = useRef(null);

    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'secondary', summary: 'Secondary', detail: 'Message Content', closable: false },
                { sticky: true, severity: 'contrast', summary: 'Contrast', detail: 'Message Content', closable: false }
            ]);
        }
    });

    return (
        <Messages ref={msgs} />
    )
}
        