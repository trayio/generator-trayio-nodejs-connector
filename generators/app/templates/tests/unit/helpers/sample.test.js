/*
	Use this folder for running specific tests relating to advanced logic with
	smaller code and helpers.

	Example: 
*/

describe("someHelper", () => {
	let params = {
	  some: "params"
	};
	describe("someHelperMethod", () => {
	  it("Should do something", () => {
		let output = falafel.helpers.someHelper
		expect(output).toEqual("someOutput");
	  });
	});
  });