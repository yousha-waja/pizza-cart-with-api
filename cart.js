 document.addEventListener("alpine:init", () => {
    Alpine.data('counter', ()=>({

      visibleS:false,
      visibleM:false,
      visibleL:false,
      visible:false,
      enjoy:false,
      pay:false,
      niks:false,
      empty: false,
      count:0,

      // checkout() {
      //   var input = document.querySelector("input");
      //   if (this.enjoy === false && parseFloat(input.value) >= parseFloat(this.total)) {
      //     this.enjoy = true;
      //     setTimeout(() => {
      //       this.enjoy = false;
      //     }, 2000);
      //     input.value = '';
      //     this.visibleS = false;
      //     this.visibleM = false;
      //     this.visibleL = false;
      //     this.visible =false;
      //     this.count = 0;
      //     this.total = 0;
      //     this.smallC = 1;
      //     this.mediumC = 1;
      //     this.largeC = 1;
      //     this.priceS = 60.00;
      //     this.priceM = 89.90;
      //     this.priceL = 104.90;
      //   } 
      //   else if (this.count === 0 && this.total === 0 && this.input !=='') {
      //       this.empty = true;
      //       setTimeout(() => {
      //         this.empty = false;
      //       }, 2000);
      //     }else if (this.pay === false && parseFloat(input.value) < parseFloat(this.total)) {
      //     this.pay = true;
      //     setTimeout(() => {
      //       this.pay = false;
      //     }, 2000);
      //     input.value = '';
      //   } else if (input.value === '') {
      //     this.niks = true;
      //     setTimeout(() => {
      //       this.niks = false;
      //     }, 2000);
      //   } else if (this.count === 0 && this.total === 0) {
      //     this.empty = true;
      //     setTimeout(() => {
      //       this.empty = false;
      //     }, 2000);
      //   }
      // },

      //properties list pizzaz
      pizzas : [],
      cart : [],
      username: 'yousha-waja',
      cartId : '8AI954cnY6',
      total:0.00,
      payment: '',
      isInputValid: false,
      message: '',

      getCart() {
        axios.get(`https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`).then((result) => {
          this.cart = result.data.pizzas;
          this.total = result.data.total;
      })
      },
            
      createCart(){
        axios.get('https://pizza-api.projectcodex.net/api/pizza-cart/create?username=yousha-waja').then((result)=>{
          this.cartId = result.data.cart_code;

          this.getCart();
        })
  },

      addPizza(pizzaId){
        axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
          "cart_code" : this.cartId,
          "pizza_id" : pizzaId
        }).then(()=> {
          this.getCart();
        })
      },
      removePizza(pizzaId){
        axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
          "cart_code" : this.cartId,
          "pizza_id" : pizzaId
        }).then(()=> {
          this.getCart();
        })
      },
      amountPaid(payment){
        axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {
          "cart_code" : this.cartId,
          "amount" : payment
        }).then((result)=> {
          if(result.data.status == "failure"){
            this.message = result.data.message + `<br> Insufficient funds! Amount payable: R${this.total.toFixed(2)}`;
            this.payment = '';
            this.isInputValid = false;
            setTimeout(() => {
              this.message = '';
            },4000)
          }
          else {
            this.message = "Payment succesful! Processing order...";
            this.payment = '';
            this.isInputValid = false;
            setTimeout(() => {
              this.createCart();
              this.message = '';
              this.total = 0;
              this.cart = [];
            },3000)
          }
        })
      },
      
      init() {
        axios
        .get('https://pizza-api.projectcodex.net/api/pizzas')
        .then((result) => {
        this.pizzas = result.data.pizzas;
        });
        this.createCart();
      },
      
    }));
  });