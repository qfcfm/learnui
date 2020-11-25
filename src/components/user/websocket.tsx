class qf_websocket {
    url: string = "ws://localhost:8080/websocket";
    socket!: WebSocket;
    callback!: ((msg: string) => void);
    connection = (callback: ((msg: string) => void)) => {
        let host = window.location.hostname;
        this.url = "ws://" + host + ":8080/websocket";
        // 检测当前浏览器是什么浏览器来决定用什么socket
        if ('WebSocket' in window) {
            console.log('WebSocket');
            this.socket = new WebSocket(this.url);
        }

        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.onerror;
        this.callback = callback;
    };
    // 连接成功触发
    private onopen = () => {
        console.log("onopen");
    };
    // 后端向前端推得数据
    private onmessage = (msg: MessageEvent) => {
        console.log(msg.data);
        if (this.callback) {
            this.callback(msg.data);
        }
    };
    // 关闭连接触发
    private onclose = () => {
        console.log("onclose");
    };
    private onerror = () => {
        console.log("onerror");
    };
    public sendMessage = (msg: string) => {
        // 向后端发送数据
        if (this.socket) {
            this.socket.send(msg);
        }
    };
    public close = () => {
        if (this.socket) {
            this.socket.close();
        }
    }
};

export default qf_websocket;