import { expect } from "chai";
import fetch from "node-fetch";

describe("User API Service", () => {
  it("should GET all users", async () => {
    const resp = await fetch("http://localhost:3000/api/user/getAllUsers");
    expect(resp.status).to.equal(200);
    const data = await resp.json();
    expect(data).to.be.an("array");
    expect(data.length).to.not.equal(0);
  });

  it("should GET a single user by ID", async () => {
    const resp = await fetch("http://localhost:3000/api/user/1");
    expect(resp.status).to.equal(200);
    const data = await resp.json();
    //console.log('Response data:', data);
    expect(data).to.be.an("object");
    expect(data.id).to.equal(1);
    expect(data).to.have.property("username");
  });

  it("should return message from getUsers endpoint", async () => {
    const resp = await fetch("http://localhost:3000/api/user/getUsers");
    const data = await resp.json();
    //console.log("Response data:", data);
    expect(data).to.be.an('object');
    expect(data.message).to.equal("Get Users Endpoint");
    expect(data.status).to.equal(200);
    
  });
});
