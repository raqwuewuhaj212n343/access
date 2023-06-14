import supertest from "supertest";
import { app } from "../../app";
import { responses } from "../../constants";
import { web3 } from "../data/users";
import authenticateToken from "../../middlewares/checkAuth";
import * as US from "../../services"
import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../../errors/auth-error";
import { web3TestLogin } from "../../controllers/web3";

const { user: userM, system: sysM } = responses;

const userApi = "/api/v1/users";

jest.mock("../../middlewares/checkAuth");

describe("web3 controller", () => {
    beforeEach(() => {
        // Any necessary setup before each test
    });

    describe("POST/ web3 user", () => {
        test("it should return error 400 on address invalid", async () => {
            //@ts-ignore
            const mockService = jest.spyOn(US, "create").mockResolvedValue({user: web3.payload});

            const { status, body } = await supertest(app).post(`${userApi}/web3/signup`).send(web3.invalidInput);

            expect(status).toBe(400);
            expect(mockService).not.toHaveBeenCalled();
            expect(body).toEqual({ errors: [{message: userM.INVALID_ADDRESS }]});
        });
        
        test("it should return the user payload with status 200 on valid address", async () => {
            //@ts-ignore
            const mockService = jest.spyOn(US, "create").mockResolvedValueOnce({user: web3.payload});
            
            const { status, body } = await supertest(app).post(`${userApi}/web3/signup`).send(web3.validInput());
       
            expect(mockService).toHaveBeenCalledWith({web3Wallets: [web3.validInput()]});
            expect(status).toBe(200);
           
        });

        test("it should return error with status 500 if the service throws", async () => {
          //@ts-ignore
            const mockService = jest.spyOn(US, "create").mockReturnValueOnce({error: new Error(sysM[500])});
          
            const { status, body } = await supertest(app).post(`${userApi}/web3/signup`).send(web3.validInput());
          
            expect(status).toBe(500);
            expect(mockService).toHaveBeenCalled();
            expect(body).toEqual({ errors: [{message: sysM[500] }]});
        })
    });

    describe("GET / Login Hash", () => {
        it("should return 400 error if address is invalid", async() => {
            //@ts-ignore
            const mockService = jest.spyOn(US, "getOneInWallets").mockReturnValueOnce({user: web3.payload});
            
            const { status, body } = await supertest(app).get(`${userApi}/web3/login-hash/${web3.invalidInput.address}`).send();

            expect(status).toBe(400);
            expect(mockService).not.toHaveBeenCalled();
            expect(body).toEqual({ errors: [{ message: userM.INVALID_ADDRESS }]});
        })

        it("should return 400 if address not found", async() => {
            //@ts-ignore
            const mockService = jest.spyOn(US, "getOneInWallets").mockReturnValueOnce({user: null});
            
            const { status, body } = await supertest(app).get(`${userApi}/web3/login-hash/${web3.validInput().address}`).send();
            
            expect(status).toBe(400);
            expect(mockService).toHaveBeenCalledWith(web3.validInput().address);
            expect(body).toEqual({ errors: [{ message: userM.NOT_FOUND }]});
        })

        it("should return 200 with the user hash if no errors", async () => {
            //@ts-ignore
            const mockService = jest.spyOn(US, "getOneInWallets").mockReturnValueOnce({user: web3.payload});
            
            const { status, body } = await supertest(app).get(`${userApi}/web3/login-hash/${web3.validInput().address}`).send();
            
            expect(status).toBe(200);
            expect(mockService).toHaveBeenCalledWith(web3.validInput().address);
            expect(body).toEqual({ message: userM.SUCCESS, hash: expect.any(String)});
        })
    })

    describe("POST/ Web3 Login", () => {
        describe("given the address is invalid", () => {
            it("should return error with 400 status", async () => {
                const { status, body } = await supertest(app).post(`${userApi}/web3/login`).send(web3.invalidloginInput);

                expect(status).toBe(400);
                expect(body).toEqual({ errors: [{ message: userM.INVALID_ADDRESS }]});
            })
        })
        
        describe("given the login has is empty", () => {
          it("should return error with status 400", async () => {
              const { status, body } = await supertest(app).post(`${userApi}/web3/login`).send({address: web3.validLoginInput.address});

              expect(status).toBe(400);
              expect(body).toEqual({ errors: [{ message: userM.HASH_REQURIED }]});
          })
        })

        describe("given the address and hash are valid", () => {
            it("should return error 400 if user not found", async () => {
                //@ts-ignore
                const mockService = jest.spyOn(US, "getOneInWallets").mockResolvedValueOnce({user: null});
                const mockUserSave = jest.fn();

                const { status, body } = await supertest(app).post(`${userApi}/web3/login`).send(web3.validLoginInput);

                expect(status).toBe(400);
                expect(mockService).toHaveBeenCalledWith(web3.validLoginInput.address)
                expect(mockUserSave).not.toHaveBeenCalled();
                expect(body).toEqual({ errors: [{message: userM.NOT_FOUND}]})
            })

            it("should return success and a token", async () => {
                //@ts-ignore
                const mockService = jest.spyOn(US, "getOneInWallets").mockResolvedValueOnce({user: web3.payload});
                const mockUserSave = jest.fn();

                const { status, body } = await supertest(app).post(`${userApi}/web3/login`).send(web3.validLoginInput);

                expect(status).toBe(200);
                expect(mockUserSave).toHaveBeenCalled();
                expect(mockService).toHaveBeenCalledWith(web3.validLoginInput.address)
            });
        })
    })

   describe("PATCH / AddWallet", () => {
      describe("given that the user is not loggedin", () => {
          beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation(() => {
                    //@ts-ignore
                    throw new AuthenticationError()
               })
          })
          it("should return error with status 401", async () => {
              const { status } = await supertest(app).patch(`${userApi}/web3/add-wallet`).send(web3.invalidInput);
              
              expect(status).toBe(401)
          })
      })
      describe("given that the user is loggedin", () =>{
        beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    req.user = { _id: web3.payload._id };
                    next()
               })
          })
          test("it should throw error if the address already exist", async () => {
              //@ts-ignore
              const mockService = jest.spyOn(US, "getOne").mockResolvedValueOnce({user: web3.payload})
              jest.spyOn(web3.payload, "save").mockImplementation(() => {
                  throw new Error("Address already exist");
              });
              const { status, body } = await supertest(app).patch(`${userApi}/web3/add-wallet`).send(web3.validInput());
            
              expect(status).toBe(400)
              expect(mockService).toHaveBeenCalledWith({_id: web3.payload._id});
              expect(body).toEqual({ errors: [ { message: 'Address already exist' } ] })
              
          });

          test("it should add to the wallet if it doesnt exist", async()=> {
              //@ts-ignore
              const mockService = jest.spyOn(US, "getOne").mockResolvedValueOnce({user: web3.payload})

              const { status, body } = await supertest(app).patch(`${userApi}/web3/add-wallet`).send(web3.validInput());
            
              expect(status).toBe(200)
              expect(mockService).toHaveBeenCalledWith({_id: web3.payload._id});
              expect(body).toHaveProperty('message', 'Success');
          })
      })
   }) 


   describe("PATCH / Remove Wallet", () => {
      describe("given that the user is loggedin", () =>{
        beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    req.user = { _id: web3.payload._id };
                    next()
               })
          })
          test("it should throw error if address is primary address", async () => {
              //@ts-ignore
              const mockService = jest.spyOn(US, "getOneInWallets").mockResolvedValueOnce({user: web3.payload})
              
              const { status, body } = await supertest(app).delete(`${userApi}/web3/remove-wallet/${web3.validInput().address}`).send();
            
              expect(status).toBe(403)
              expect(mockService).toHaveBeenCalledWith(web3.validInput().address);
              expect(body).toEqual({errors: [{message: sysM[403]}]})
          });

          test("It should successfully remove non primary address if it exists", async() => {
              //@ts-ignore
              const mockService = jest.spyOn(US, "getOneInWallets").mockResolvedValueOnce({user: web3.payload})
              
              const { status, body } = await supertest(app).delete(`${userApi}/web3/remove-wallet/${web3.validNotPrimary.address}`).send();
              
              expect(status).toBe(200)
              expect(mockService).toHaveBeenCalledWith(web3.validNotPrimary.address);
              expect(body).toEqual({message: userM.SUCCESS})
          })
      })
   })
   
   describe("PATCH / Activate Wallet", () => {
       beforeEach(() => {
               //@ts-ignore
               authenticateToken.mockImplementation((req: Request, res:Response, next: NextFunction) => {
                    //@ts-ignore
                    req.user = { _id: web3.payload._id };
                    next()
               })
        })

        it("should set the address as primary Address if it exist", async () => {
            //@ts-ignore
            jest.spyOn(US, "activateWallet").mockResolvedValueOnce({user: web3.payload})
              
            const { status } = await supertest(app).patch(`${userApi}/web3/activate-wallet/${web3.validNotPrimary.address}`).send();
            
            expect(status).toBe(200);
        })
   })
});