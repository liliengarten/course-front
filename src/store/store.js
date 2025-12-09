import {reactive} from "vue";
import {baseUrl} from "@/main";

export const store = reactive({
    cartVisible: false,
    userToken: localStorage.getItem("userToken") || '',
    cart: [],
    visibleCart: [],
    catalog: [],
    modalVisible: false,

    changeCartVisibility() {
        if (!(localStorage.getItem('userToken'))) return

        this.cartVisible = !this.cartVisible
    },
    setUserToken(token) {
        this.userToken = token
        localStorage.setItem("userToken", token)
    },
    async requestCart() {
        try {
            const res = await fetch(baseUrl + '/cart', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('userToken')}`
                }
            })

            if (!res.ok) throw res

            const { data } = await res.json()
            this.cart = data
        } catch(err) {
            console.log(err)
        }
    },
    async requestProducts() {
        try {
            const res = await fetch(baseUrl + '/products', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (!res.ok) throw "Something went wrong :("

            const { data } = await res.json()
            this.catalog = data
        } catch(error) {
            console.log(error)
        }
    },
    clearVisibleCart() {
        this.visibleCart = []
    }
})