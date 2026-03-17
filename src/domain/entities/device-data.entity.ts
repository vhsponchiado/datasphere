export interface DeviceDataProps {
    createdAt: string;
    rpm: number;
    temperature: number;
    status: 'on' | 'off' | 'operating';
}

export class DeviceData {
    constructor(private readonly props: DeviceDataProps) { }

    get createdAt(): string {
        return this.props.createdAt;
    }

    get rpm(): number {
        return this.props.rpm;
    }

    get temperature(): number {
        return this.props.temperature;
    }

    get status(): 'on' | 'off' | 'operating' {
        return this.props.status;
    }

    toJSON() {
        return {
            createdAt: this.createdAt,
            rpm: this.rpm,
            temperature: this.temperature,
            status: this.status,
        };
    }
}
