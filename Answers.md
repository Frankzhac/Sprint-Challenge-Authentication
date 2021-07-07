1. What is the purpose of using sessions?

  Sessions are used for persisting authentication data in some designated storage (like a server), keeping a record of information about individual clients. Through this procedure, each client (some specific piece of hardware or software from an individual device) will be 'remembered' once authenticated - credentials and other information won't have to be gathered for every single request.

2. What does bcrypt do to help us store passwords in a secure manner.

  bcrypt ensures that passwords are not stored in plaintext in order to prevent passwords from becoming completely compromised in the event of a password leakage - the outputs will not be immediately readable to humans. It also uses hashing, which means that unlike the two-way process of encryption, the password can be encoded but not decoded upon being processed (one-way conversion).

3. What does bcrypt do to slow down attackers?

  Salting
  bcrypt not only hashes passwords; it can also generate random salts for the hashes - this means that some additional randomized input(s) get added to the hashing function, and these salts can be used even more commonly used patterns more 'different' from one another in storage. This results in larger rainbow tables, slowing down attackers.


4. What are the three parts of the JSON Web Token?

  Header - contains the algorithm (for token creation) and token type
  Payload - includes user information, specified permissions and possibly additional relevant data
  Signature - a base64-encoded string that is 'signed' with a secret (secret key) - this is essentially a computed 'signature' used to validate a JWT
