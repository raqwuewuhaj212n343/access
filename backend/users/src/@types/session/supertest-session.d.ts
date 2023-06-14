import { SuperTest, Test } from "supertest";

declare module "supertest-session" {
    interface Session {
        set(name: string, value: any): this;
        get(name: string): any;
        has(name: string): boolean;
        clear(): this;
        save(callback?: (err: any) => void): void;
    }

    interface SessionSuperTest extends SuperTest<Test> {
        session(cookie?: string | object | null): Session;
    }

    function session(app: any): SessionSuperTest;
    export = session;
}
