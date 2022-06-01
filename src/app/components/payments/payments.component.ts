import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


declare var paypal

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html'})
export class PaymentsComponent implements OnInit {

//// account venditore è corsani.niccolo.94@gmaIL.COM
//// https://www.youtube.com/watch?v=AtZGoueL4Vs


    @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

    product = {
        price: 777.77,
        description: 'used couch, decent condition',
        img: 'assets/couch.jpg'
    };

    paidFor = false;

    ngOnInit() {
        paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.product.description,
                                amount: {
                                    currency_code: 'USD',
                                    value: this.product.price
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.paidFor = true;
                    console.log(order);
                },
                onError: err => {
                    console.log(err);
                }
            })
            .render(this.paypalElement.nativeElement);
    }


}
