import supertest from "supertest";
import { app } from "../../app";
import { responses } from "../../constants";
import { emails } from "../data/users";
import * as TM from "../../services/template";
import { NextFunction, Request, Response } from "express";
import authenticateToken from "../../middlewares/checkAuth";
import { ETemplate } from "../../utils/enums";
import { aboutUs, tempID } from "../data/template";

const { user: userM } = responses;

const templateApi = "/api/v1/templates";

jest.mock("../../middlewares/checkAuth");

beforeEach(() => {
    //@ts-ignore
    authenticateToken.mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
            //@ts-ignore
            req.user = { _id: emails.payload._id };
            next();
        }
    );
});


describe("POST / Templates", () => {
     it("should response with status 200 on created", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "create").mockResolvedValue({ template: expect.any(Object)})
          const { status, body } = await supertest(app).post(`${templateApi}/${ETemplate.aboutUs}`).send(aboutUs)
         
          expect(status).toBe(200)
          expect(mockService).toHaveBeenCalled();
          expect(body).toHaveProperty('message', 'Success')
     })

     it("should return error if the database throws", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "create").mockResolvedValue({ error: true})
          const { status, body } = await supertest(app).post(`${templateApi}/${ETemplate.aboutUs}`).send(aboutUs)
         
          expect(status).toBe(500)
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal Server Error'}]})
     })
})


describe("PUT / Templates", () => {
     it("should response with status 200 on created", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "update").mockResolvedValue({ template: expect.any(Object)})
          const { status, body } = await supertest(app).put(`${templateApi}/${ETemplate.aboutUs}/${tempID}`).send(aboutUs)
         
          expect(status).toBe(200)
          expect(mockService).toHaveBeenCalled();
          expect(body).toHaveProperty('message', 'Success')
     })

     it("should return error if the database throws", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "update").mockResolvedValue({ error: true})
          const { status, body } = await supertest(app).put(`${templateApi}/${ETemplate.aboutUs}/${tempID}`).send(aboutUs)
         
          expect(status).toBe(500)
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: 'Internal Server Error'}]})
     })
})

describe("GET / One Template", () => {
     it("should response with status 200 and the requested template", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "getOneById").mockResolvedValue({ template: expect.any(Object)})
          const { status, body } = await supertest(app).get(`${templateApi}/${tempID}`)
         
          expect(status).toBe(200)
          expect(mockService).toHaveBeenCalledWith(tempID.toString(), emails.payload._id);
          expect(body).toHaveProperty('message', 'Success')
     })

     it("should return error if the database throws", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "getOneById").mockResolvedValue({ error: true })
          const { status, body } = await supertest(app).get(`${templateApi}/${tempID}`)
         
          expect(status).toBe(500)
          expect(mockService).toHaveBeenCalledWith(tempID.toString(), emails.payload._id);
          expect(body).toEqual({errors: [{message: 'Internal Server Error'}]})
     })
})


describe("DELETE / Template", () => {
     it("should response with status 204", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "deleteById").mockResolvedValue({ template: expect.any(Object)})
          const { status } = await supertest(app).delete(`${templateApi}/${tempID}`)
         
          expect(status).toBe(204)
          expect(mockService).toHaveBeenCalledWith(tempID.toString(), emails.payload._id);
     })

     it("should return error if the database throws", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "deleteById").mockResolvedValue({ error: true })
          const { status, body } = await supertest(app).delete(`${templateApi}/${tempID}`)
         
          expect(status).toBe(500)
          expect(mockService).toHaveBeenCalledWith(tempID.toString(), emails.payload._id);
          expect(body).toEqual({errors: [{message: 'Internal Server Error'}]})
     })
})

describe("GET / Many Template", () => {
     it("should response with status 200", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "getManyByUserId").mockResolvedValue({ template: expect.any(Array)})
          const { status } = await supertest(app).get(`${templateApi}`)
         
          expect(status).toBe(200)
          expect(mockService).toHaveBeenCalledWith(emails.payload._id);
     })

     it("should return error if the database throws", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(TM, "getManyByUserId").mockResolvedValue({ error: true })
          const { status, body } = await supertest(app).get(`${templateApi}`)
         
          expect(status).toBe(500)
          expect(mockService).toHaveBeenCalledWith(emails.payload._id);
          expect(body).toEqual({errors: [{message: 'Internal Server Error'}]})
     })
})