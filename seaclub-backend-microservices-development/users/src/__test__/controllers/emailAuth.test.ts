import supertest from "supertest";
import { app } from "../../app";
import { responses } from "../../constants";
import { emails } from "../data/users";
import * as US from "../../services";
import * as PS from "../../utils/bcrypt";
import { NextFunction, Request, Response } from "express";
import authenticateToken from "../../middlewares/checkAuth";
import * as SM from "../../utils/sendgrid";
import * as JW from "../../utils/jwtEncryption";
import { AuthenticationError } from "../../errors/auth-error";
const { user: userM, system: sysM, email: emailM } = responses;

const userApi = "/api/v1/users";

jest.mock("../../middlewares/checkAuth");

describe("POST/ Signup", () => {
     it("should return 400 error if email is invalid", async () => {
          const { status, body } = await supertest(app).post(`${userApi}/signup`).send(emails.invalidInput);

          expect(status).toBe(400);
          expect(body).toEqual({ errors: [{ message: userM.INVALID_EMAIL }] });
     })

     it("should create the user if email and password is valid", async () => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "create").mockResolvedValueOnce({user: emails.payload});
          //@ts-ignore
          const mockHashPass = jest.spyOn(PS, "hashPassword").mockResolvedValue(emails.validInput.password);

          const { status, body } = await supertest(app).post(`${userApi}/signup`).send(emails.validInput);

          expect(status).toBe(200);
          expect(mockService).toHaveBeenCalled();
          expect(mockHashPass).toHaveBeenCalledWith(emails.validInput.password);
          expect(body).toHaveProperty('message', 'Success');
     })

     it("should return error 400 if the database throws", async () => {
          //@ts-ignore
          const mockService = jest.spyOn(US, "create").mockResolvedValueOnce({error: new Error()});
          //@ts-ignore
          const mockHashPass = jest.spyOn(PS, "hashPassword").mockResolvedValue(emails.validInput.password);

          const { status } = await supertest(app).post(`${userApi}/signup`).send(emails.validInput);

          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalled();
          expect(mockHashPass).toHaveBeenCalledWith(emails.validInput.password);
     })
})

describe("POST / Login", () => {
     describe("valid email and password entered by user", () => {
          it("should return error with message if email not primary email", async () => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
               //@ts-ignore 
               const comparePasswordMock = jest.spyOn(PS, "comparePassword").mockResolvedValueOnce(true);

               const { status, body } = await supertest(app).post(`${userApi}/login`).send(emails.validNotPrimary);

               expect(status).toBe(400);
               expect(comparePasswordMock).not.toHaveBeenCalled()
               expect(mockService).toHaveBeenCalledWith(emails.validNotPrimary.email);
               expect(body).toEqual({errors: [{message: userM.INVALID_LOGIN_CREDENTIALS}]})

          })

          it("should return error if the entered password does not match the actual password", async() => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
               //@ts-ignore 
               const comparePasswordMock = jest.spyOn(PS, "comparePassword").mockResolvedValueOnce(false);

               const { status, body } = await supertest(app).post(`${userApi}/login`).send(emails.validInput);

               expect(status).toBe(400);
               expect(comparePasswordMock).toHaveBeenCalled();
               expect(mockService).toHaveBeenCalledWith(emails.validInput.email);
               expect(body).toEqual({errors: [{message: userM.INVALID_LOGIN_CREDENTIALS}]})
          })

          it("should login the user successfully if the email and password matches", async () => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
               //@ts-ignore 
               const comparePasswordMock = jest.spyOn(PS, "comparePassword").mockResolvedValueOnce(true);

               const { status } = await supertest(app).post(`${userApi}/login`).send(emails.validInput);

               expect(status).toBe(200);
               expect(comparePasswordMock).toHaveBeenCalled();
               expect(mockService).toHaveBeenCalledWith(emails.validInput.email);
          })
     })
})

describe("GET / Validation OTP", ()=> {
     describe("The user is loggedin", ()=> {
          beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    req.user = { _id: emails.payload._id };
                    next()
               })
          })
          it("should return error if user email is already verified", async()=> {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})

               const { status } = await supertest(app).get(`${userApi}/email-otp/${emails.validNotPrimary.email}`).send()

               expect(status).toBe(400);
               expect(mockService).toHaveBeenCalledWith(emails.validNotPrimary.email)
          })

          it("should generate OTP and send to users mail", async () => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
               //@ts-ignore
               const sendMail = jest.spyOn(SM, "sendEmail").mockResolvedValue(async () => null)
               
               const { status } = await supertest(app).get(`${userApi}/email-otp/${emails.validInput.email}`).send()
              
               expect(status).toBe(204);
               expect(sendMail).toHaveBeenCalledWith(expect.any(Object))
               expect(mockService).toHaveBeenCalledWith(emails.validInput.email)
          })
     })
})


describe("POST / Validate Email OTP", ()=> {
     describe("The user is loggedin", ()=> {
          beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    req.user = { _id: emails.payload._id };
                    next()
               })
          })
          it("should return error if the OTP is expired", async()=> {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})

               const { status, body } = await supertest(app).post(`${userApi}/validate-email-otp`).send(emails.emailOTP)

               expect(status).toBe(400);
               expect(mockService).toHaveBeenCalledWith(emails.emailOTP.email);
               expect(body).toEqual({errors: [{message: emailM.EXPIRED_OTP}]})
          })

          it("should return error if the OTP entered is incorrect", async() => {
                //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})

               const { status, body } = await supertest(app).post(`${userApi}/validate-email-otp`).send(emails.emailOTP2)

               expect(status).toBe(400);
               expect(mockService).toHaveBeenCalledWith(emails.emailOTP2.email);
               expect(body).toEqual({errors: [{message: emailM.INVALID_OTP}]})
          })

          it("should successfully activate the account if OTP and Email are valid", async () => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
               //@ts-ignore
               const save = jest.spyOn(emails.payload, "save").mockResolvedValue(true);

               const { status } = await supertest(app).post(`${userApi}/validate-email-otp`).send({...emails.emailOTP2, otp: 123456}).expect(204)

               expect(status).toBe(204);
               expect(save).toHaveBeenCalled();
               expect(mockService).toHaveBeenCalledWith(emails.emailOTP2.email);
          })
     })
})


describe("GET / Request Password Reset", ()=> {
     it("should return error 400 if the email does not exist", async()=> {
          //@ts-ignore
          const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: null})

          const { status, body } = await supertest(app).get(`${userApi}/password-reset-link/none@example.com`)

          expect(status).toBe(400);
          expect(mockService).toHaveBeenCalledWith('none@example.com');
          expect(body).toEqual({errors: [{message: userM.NOT_FOUND}]})
     })

     it("should return success with status 204 if mail is successfuly sent", async()=> {
          //@ts-ignore
          const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
          //@ts-ignore
          const mockMail = jest.spyOn(SM, "sendEmail").mockResolvedValue(true)
          const { status } = await supertest(app).get(`${userApi}/password-reset-link/${emails.validInput.email}`)

          expect(status).toBe(204);
          expect(mockMail).toHaveBeenCalled();
          expect(mockService).toHaveBeenCalledWith(emails.validInput.email);
     })

     it("should return error 400 if sending Email Throws", async()=> {
          //@ts-ignore
          const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({user: emails.payload})
          //@ts-ignore
          const mockMail = jest.spyOn(SM, "sendEmail").mockRejectedValue(true)
          const { status, body } = await supertest(app).get(`${userApi}/password-reset-link/${emails.validInput.email}`)

          expect(status).toBe(400);
          expect(mockMail).toHaveBeenCalled();
          expect(mockService).toHaveBeenCalledWith(emails.validInput.email);
          expect(body).toEqual({ errors: [{ message: emailM.FAILURE }] });
     })
})


describe("POST / Reset password with Link", () => {
     it("should return 400 if no password entered", async() => {

          const { status, body } = await supertest(app).post(`${userApi}/password-reset/token`).send({})

          expect(status).toBe(400)
          expect(body).toEqual({errors: [{message: userM.INVALID_PASSWORD}]})
     })

     it("should return Authentication error if token expired or invalid", async() => {
          //@ts-ignore
          const mockJWTDecrypt = jest.spyOn(JW, 'jwtDecrypt').mockReturnValueOnce(false)

          const { status, body } = await supertest(app).post(`${userApi}/password-reset/token`).send({password: "password"})

          expect(status).toBe(400);
          expect(mockJWTDecrypt).toHaveBeenCalled();
          expect(body).toEqual({errors: [{message: userM.AUTHENTCATION_FAILED}]})
     })

     it("it should return success with 204 status on password changed successfully", async() => {
          //@ts-ignore
          const mockService = jest.spyOn(US, 'update').mockImplementation(() => ({user: emails.payload}))
          //@ts-ignore
          const mockJWTDecrypt = jest.spyOn(JW, 'jwtDecrypt').mockReturnValueOnce(true)

          const { status } = await supertest(app).post(`${userApi}/password-reset/token`).send({password: "password"})

          expect(status).toBe(204);
          expect(mockJWTDecrypt).toHaveBeenCalled();
          expect(mockService).toHaveBeenCalled();
     })
})

describe("POST / Password Reset", () => {
     describe("given that the user is not Loggedin", () => {
          beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    throw new AuthenticationError()
               })
          })
          it("should return error status 401 with message", async() => {

               const { status, body } = await supertest(app).post(`${userApi}/password-reset`).send({})
               
               expect(status).toBe(401);
               expect(body).toEqual({ errors: [ { message: 'Not Authenticated' } ] })
          })
     })

     describe("given that the user is loggedin", () => {
          beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    req.user = { _id: emails.payload._id };
                    next()
               })
          })
          
          it("should return error 400 with message if there is no current password or newPassword", async() => {
               const { status, body } = await supertest(app).post(`${userApi}/password-reset`).send({email: 'email@xample.com'})
               
               expect(status).toBe(400);
               expect(body).toEqual({ errors: [ { message: userM.INVALID_PASSWORD } ] })
          })

          it("should return error 400 if the current password does not match", async() => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({ user: emails.payload })
               //@ts-ignore
               const comparePasswordMock = jest.spyOn(PS, "comparePassword").mockResolvedValueOnce(false);

               const { status, body } = await supertest(app).post(`${userApi}/password-reset`).send(emails.resetPasswordInput)
               
               expect(status).toBe(400);
               expect(mockService).toHaveBeenCalledWith(emails.resetPasswordInput.email)
               expect(comparePasswordMock).toHaveBeenCalled();
               expect(body).toEqual({ errors: [ { message: userM.WRONG_PASSWORD } ] })
          })

          it("should reset the password if current password matches with status 204", async() => {
               //@ts-ignore
               const mockService = jest.spyOn(US, "getOneInEmails").mockResolvedValueOnce({ user: emails.payload })
               //@ts-ignore
               const comparePasswordMock = jest.spyOn(PS, "comparePassword").mockResolvedValueOnce(true);

               const { status } = await supertest(app).post(`${userApi}/password-reset`).send(emails.resetPasswordInput)
               
               expect(status).toBe(204);
               expect(mockService).toHaveBeenCalledWith(emails.resetPasswordInput.email)
               expect(comparePasswordMock).toHaveBeenCalled();
          })
     })
})