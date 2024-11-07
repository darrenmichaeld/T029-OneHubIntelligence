import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pandas as pd
import json

# Load JSON file into a Pandas DataFrame

with open("db-tester.json", "r") as f:
    data = json.load(f)

df = pd.json_normalize(data['flights'])

#Function to generate and send email
def send_email(recipient_email, subject, body, sender_email, sender_password):
    try:
        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject

        # Attach the email body
        msg.attach(MIMEText(body, 'plain'))

        # Set up the SMTP server (e.g., Gmail's SMTP server)
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Secure the connection

        # Log in to the email account
        server.login(sender_email, sender_password)

        # Send the email
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)

        # Close the server connection
        server.quit()

        print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email. Error: {str(e)}")

def send_or_not(departure_origin, arrival_place, brand, threshold):
    # Filter based on departure, arrival, and brand
    resultdf = df[(df['departure_origin'] == departure_origin) & 
                  (df['arrival_place'] == arrival_place) & 
                  (df['brand'] == brand)]
    
    # Convert 'estimated_departure' to datetime and sort
    resultdf['estimated_departure'] = pd.to_datetime(resultdf['estimated_departure'])
    resultdf = resultdf.sort_values(by=['departure_origin', 'arrival_place', 'estimated_departure'])
    
    # Calculate price change
    resultdf['price_change'] = resultdf.groupby(['departure_origin', 'arrival_place'])['price_per_kg'].diff().ne(0)
    resultdf.index = [i for i in range(resultdf.shape[0])]
    
    
    # Find the index of the first price change
    change = resultdf.iloc[1:][resultdf['price_change'] == True]
    if change.empty:
        print("No price changes found.")
        return  # Exit the function if there are no price changes
    
    idx = change.index[0]
    
    if idx >= 1:
        # Calculate the change in price
        change_in_price = change['price_per_kg'].iloc[0] - resultdf.iloc[idx - 1:idx]['price_per_kg'].iloc[0]

        # Determine if it's a price increase or decrease and send the appropriate alert
        if change_in_price > threshold:
            subject = "Price Increase Alert"
            body = (f"Dear Team,\n\n"
                    f"The price per kg for {brand} on the route from {departure_origin} to {arrival_place} "
                    f"has increased by {change_in_price:.2f} units.\n"
                    "Please be aware of this change and consider taking further actions if necessary.\n\n"
                    "Best regards,\n"
                    "Pricing Team")
            send_alert(subject, body)
        elif change_in_price * -1 > threshold:
            subject = "Price Decrease Alert"
            body = (f"Dear Team,\n\n"
                    f"The price per kg for {brand} on the route from {departure_origin} to {arrival_place} "
                    f"has decreased by {abs(change_in_price):.2f} units.\n"
                    "Please be aware of this change and consider taking further actions if necessary.\n\n"
                    "Best regards,\n"
                    "Pricing Team")
            send_alert(subject, body)

def send_alert(subject, body):
    # Email configuration
    sender_email = "christ.wilson10@gmail.com"  # Replace with your email
    sender_password = "xjrr vziq znac btyd"  # Replace with your email password or app password
    
    recipient_email = "vanessarvln@gmail.com"  # Replace with the recipient's email
    
    # Call the function to send email
    send_email(recipient_email, subject, body, sender_email, sender_password)

send_or_not("Hong Kong", "Los Angeles","Cathay", 1.5)