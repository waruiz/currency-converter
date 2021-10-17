const rewire = require("rewire")
const CurrencyList = rewire("./CurrencyList")
const mapStateToProps = CurrencyList.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ currencies: ["USD", "EUR", "JPY", "GBP", "BTC", "ETH", "XRP", "USDT", "BCH", "BSV", "LTC"], theme: { primaryColor: "red" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ currencies: "USDT", theme: { primaryColor: "black" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ currencies: ["USD", "EUR", "JPY", "GBP", "BTC", "ETH", "XRP", "USDT", "BCH", "BSV", "LTC"], theme: { primaryColor: "#F00" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ currencies: ["USD", "EUR", "JPY", "GBP", "BTC", "ETH", "XRP", "USDT", "BCH", "BSV", "LTC"], theme: { primaryColor: "hsl(10%,20%,40%)" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ currencies: ["USD", "EUR", "JPY", "GBP", "BTC", "ETH", "XRP", "USDT", "BCH", "BSV", "LTC"], theme: { primaryColor: "#FF00FF" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
