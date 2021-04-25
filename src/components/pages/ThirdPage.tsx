import React, { Component } from 'react';
import Notice from 'components/lib/Notice';

class Main extends Component<any> {
    refNotice: React.RefObject<HTMLButtonElement>;
    constructor(props: any) {
        super(props);
        this.refNotice = React.createRef<HTMLButtonElement>();
    }

    onClick = () => {
        this.refNotice.current?.click();
    }

    render() {
        return (
            <Notice ref={this.refNotice}>
                <button onClick={this.onClick}>test</button>
            </Notice>
        );
    }
}

export default Main;