import supertest from "supertest";
import { app } from "../../app";
import { responses } from "../../constants";
import { emails } from "../data/users";
import * as US from "../../services";
import { NextFunction, Request, Response } from "express";
import authenticateToken from "../../middlewares/checkAuth";

const { user: userM } = responses;

const userApi = "/api/v1/users";

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

describe("PATCH / Company", () => {
     it("should update user company record", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "update").mockResolvedValue({ user: emails.payload })
          const { status } = await supertest(app).patch(`${userApi}/company`).send({company: {}})

          expect(status).toBe(200)
          expect(mockService).toHaveBeenCalled();
     })
})

describe("GET / Company", () => {
     it("should return error with message if no company found for the user", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "getUserCompany").mockResolvedValue({ user: null })
          const { status, body } = await supertest(app).get(`${userApi}/company`)

          expect(status).toBe(400)
          expect(mockService).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: userM.NOT_FOUND}]})
     })

     it("should respond with status 200 and send the user requested company", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "getUserCompany").mockResolvedValue({ user: emails.payload })
          const { status, body } = await supertest(app).get(`${userApi}/company`)

          expect(status).toBe(200)
          expect(mockService).toHaveBeenCalled();
          expect(body).toHaveProperty('message', 'Success')
     })
})