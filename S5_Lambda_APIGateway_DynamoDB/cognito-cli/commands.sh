# Sign-Up CLI
aws cognito-idp sign-up --client-id 4s6cepn5g37b3nvhj97iutgj85 --username jane@example.com --password PASSWORD --user-attributes Name="email",Value="jane@example.com" Name="name",Value="Jane"

# Admin Confirm Sign-Up CLI
aws cognito-idp admin-confirm-sign-up --user-pool-id ap-southeast-1_WqYN2b4RN --username=jane@example.com