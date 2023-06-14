import supertest from "supertest";
import { app } from "../../app";
import { NextFunction, Request, Response } from "express";
import * as PR from "../../services";
import { paramsId, prBody, userId } from "../data";
import * as checkAuth from "@seaclub/common";

const api = "/api/v1/projects";

jest.mock("@seaclub/common", () => {
     const actual = jest.requireActual("@seaclub/common");
     return {
          __esModule: true,
          ...actual,
          authenticateToken: jest.fn()
     };
});

beforeEach(() => {
    //@ts-ignore
    checkAuth.authenticateToken.mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
            //@ts-ignore
            req.user = { _id: userId.toString() };
            next();
        }
    );
});

describe("POST / create Project", () => {
     it("should create the project and send the payload with status 200", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "create").mockResolvedValueOnce({project: expect.any(Object)})
          
          const { status, body } = await supertest(app).post(`${api}`).send(prBody);

          expect(status).toBe(200);
          expect(mockService).toHaveBeenCalled();
          expect(body).toHaveProperty("message", "Success");
     })
 
     it("should return error if the database throws", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "create").mockResolvedValueOnce({error: expect.any(Object)})
          
          const { status, body } = await supertest(app).post(`${api}`).send(prBody);
         
          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal server error'}]});
     })
})


describe("PATCH / Update Project", () => {
     it("should update the project send the payload with status 200", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "update").mockResolvedValueOnce({project: expect.any(Object)})
          
          const { status, body } = await supertest(app).patch(`${api}/${paramsId}`).send(prBody);

          expect(status).toBe(200);
          expect(mockService).toHaveBeenCalled();
          expect(body).toHaveProperty("message", "Success");
     })
 
     it("should return error if the database throws", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "update").mockResolvedValueOnce({error: expect.any(Object)})
          
          const { status, body } = await supertest(app).patch(`${api}/${paramsId}`).send(prBody);

          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal server error'}]});
     })
})


describe("GET / Project", () => {
     it("should respond with status 200 and the request project", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "getOneById").mockResolvedValueOnce({project: expect.any(Object)})
          
          const { status, body } = await supertest(app).get(`${api}/${paramsId}`);

          expect(status).toBe(200);
          expect(mockService).toHaveBeenCalled();
          expect(body).toHaveProperty("message", "Success");
     })
 
     it("should return error if the database throws", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "getOneById").mockResolvedValueOnce({error: expect.any(Object)})
          
          const { status, body } = await supertest(app).get(`${api}/${paramsId}`);

          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal server error'}]});
     })
})


describe("DELETE / Project", () => {
     it("should delete and respond with status 204", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "deleteById").mockResolvedValueOnce({project: expect.any(Object)})
          
          const { status } = await supertest(app).delete(`${api}/${paramsId}`);

          expect(status).toBe(204);
          expect(mockService).toHaveBeenCalled();
     })
 
     it("should return error if the database throws", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "deleteById").mockResolvedValueOnce({error: expect.any(Object)})
          
          const { status, body } = await supertest(app).delete(`${api}/${paramsId}`);

          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal server error'}]});
     })
})



describe("GET / Many Project", () => {
     it("should respond with status 200 with requested projects", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "getMany").mockResolvedValueOnce({project: expect.any(Array)})
          
          const { status } = await supertest(app).get(`${api}`);

          expect(status).toBe(200);
          expect(mockService).toHaveBeenCalled();
     })
 
     it("should return error if the database throws", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(PR, "getMany").mockResolvedValueOnce({error: expect.any(Object)})
          
          const { status, body } = await supertest(app).get(`${api}`);

          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal server error'}]});
     })
})