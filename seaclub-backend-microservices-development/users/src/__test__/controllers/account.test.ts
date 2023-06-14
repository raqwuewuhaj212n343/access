import supertest from "supertest";
import { app } from "../../app";
import { responses } from "../../constants";
import { emails, notification, preferences } from "../data/users";
import * as US from "../../services";
import * as PS from "../../utils/bcrypt";
import { NextFunction, Request, Response } from "express";
import authenticateToken from "../../middlewares/checkAuth";

const { user: userM, system: sysM, email: emailM } = responses;

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
})

describe("DELETE / Delete user by ID", () => {
          it("should update the user isActive status to false", async() => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "update").mockResolvedValue({ user: emails.payload })
               const { status } = await supertest(app).delete(`${userApi}/account`).send()

               expect(status).toBe(201)
               expect(mockService).toHaveBeenCalled();
          })

          it("should return an error if database throws", async() => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "update").mockResolvedValueOnce({ error: true })
               const { status } = await supertest(app).delete(`${userApi}/account`).send()

               expect(status).toBe(500)
               expect(mockService).toHaveBeenCalled();
          })
})

describe("PATCH / Deactivate Account", () => {
     
     it("should throw an error if the entered password does not match", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "getOne").mockResolvedValue({ user: emails.payload })
          //@ts-ignore
          const mockPasswordCompare = jest.spyOn(PS, "comparePassword").mockResolvedValue(false);

          const { status, body } = await supertest(app).patch(`${userApi}/account/deactivate`).send({password: emails.validInput.password, duration: 5})
         
          expect(status).toBe(400)
          expect(mockService).toHaveBeenCalledWith({_id: emails.payload._id});
          expect(mockPasswordCompare).toHaveBeenCalled();
          expect(body).toEqual({errors: [{ message: userM.WRONG_PASSWORD}]});
     })

     it("should deactivate the user successfully if the required criteria is met", async() => {
           //@ts-ignore
          const mockService = jest.spyOn(US, "getOne").mockResolvedValue({ user: emails.payload })
          //@ts-ignore
          const mockPasswordCompare = jest.spyOn(PS, "comparePassword").mockResolvedValue(true);

          const { status } = await supertest(app).patch(`${userApi}/account/deactivate`).send({password: emails.validInput.password, duration: 5})
         
          expect(status).toBe(201)
          expect(mockService).toHaveBeenCalledWith({_id: emails.payload._id});
          expect(mockPasswordCompare).toHaveBeenCalled();
     })
})


describe("PATCH / Activate account", () => {

     it("should activate the users account", async () => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "update").mockResolvedValue({ user: emails.payload })
         
          const { status } = await supertest(app).patch(`${userApi}/account/activate`).send()
         
          expect(status).toBe(201)
          expect(mockService).toHaveBeenCalled();
     })
})

describe("PATCH / Account Prefernces", () => {

     it("should add the preferences to users account", async () => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "updatePreferences").mockResolvedValue({ user: emails.payload })
         
          const { status } = await supertest(app).patch(`${userApi}/account/settings/preferences`).send(preferences)
         
          expect(status).toBe(201)
          expect(mockService).toHaveBeenCalled();
     })
})

describe("PATCH / Account Notifications", () => {

     it("should add the notifications settings to users account", async () => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "updateNotification").mockResolvedValue({ user: emails.payload })
         
          const { status } = await supertest(app).patch(`${userApi}/account/settings/notification`).send(notification)
         
          expect(status).toBe(201)
          expect(mockService).toHaveBeenCalled();
     })
})
