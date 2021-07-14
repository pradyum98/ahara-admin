import React, { useState } from 'react'
import {
    Button,
  } from "@themesberg/react-bootstrap";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function PaymentPortal(props) {
	const [name, setName] = useState('Mehul')

	async function displayRazorpay() {
		try{
			const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

			if (!res) {
				alert('Razorpay SDK failed to load. Are you online?')
				return
			}
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: props.totalValue })
			};
			const data = await fetch('http://localhost:8080/createOrder',requestOptions).then((t) =>
				t.json()
			).catch((err) => {
				console.log("Error while creating order",err);
			})
	
			console.log(data)
	
			const options = {
				key: 'rzp_test_frRF8qc2Zug2nv',
				currency: data.currency,
				amount: (data.amount/100).toString(),
				order_id: data.id,
				name: 'Ahara',
				description: 'Pay to generate coupons',
				//image: 'http://localhost:1337/logo.svg',
				handler: function (response) {
					console.log(response);
					props.onPayment();
					alert("Payment Successfull!")
				},
				prefill: {
					name,
					email: 'pradyummenon@gmail.com',
					phone : '9786966659'
				}
			}
			const paymentObject = new window.Razorpay(options)
			paymentObject.open()
		} catch (err){
			console.log(err);
		}
		
	}

	return (
		<div className="App">
			<header className="App-header">
				<Button
					onClick={displayRazorpay}
				>
					Proceed to Pay
				</Button>
			</header>
		</div>
	)
}

export default PaymentPortal