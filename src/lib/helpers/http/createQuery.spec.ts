import createQuery from "./createQuery"

describe("createQuery", () => {
  it("should return the correct value", () => {
    expect(createQuery({ param: "value", another: "value" })).toBe(
      "?param=value&another=value"
    )
  })
})

export {}
