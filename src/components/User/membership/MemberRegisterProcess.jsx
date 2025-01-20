import React from "react";

const MemberRegisterProcess = () => {
  return (
    <div data-aos='fade-up' data-aos-duration='700'>
      <ol className="flex flex-col gap-5 text-sm font-medium">
        <li>
          1. Understand Member benefits, Membership Options and Fee Details.
          Read more
        </li>
        <li>2. Select unique username and password</li>
        <li>3. Complete Membership Application Online</li>
      </ol>
      <div className="my-5 text-sm">
        <h1 className="font-medium">4. Remit Membership Fee :</h1>
        <p className="my-3 text-xs">
          Please choose from 3 Payment Options, for remitting the membership and
          annual subscription fees:
        </p>

        <p className="font-medium">Online Payment</p>
        <p className="my-3 text-xs">
          As per government regulations, we do not process corporate/commercial
          credit cards. Kindly make credit card payments through personal credit
          cards – VISA or MASTERCARD.
        </p>

        <p className="font-medium">Bank Transfer</p>
        <p className="my-3 text-xs">
          Please use the following bank account details for payments:
        </p>
        <div className="my-3 text-xs font-semibold">
          <h3>Bank Name : Industrial Development Bank of India Limited</h3>
          <h3>Branch Code  :385</h3>
          <h3>Branch MICR Code:682259004</h3>
          <h3>Branch IFSC Code  :IBKL 0000385</h3>
          <h3>A/c. in the Name of :World Spice Organisation</h3>
          <h3>Account No.  :0385103000000842</h3>
        </div>

        <p className="font-medium">Demand Drafts/Cheques</p>
        <p className="my-3 text-xs">
          Please send Cheques and Demand Drafts at the address below:
        </p>
        <div className="my-3 text-xs font-semibold">
          <h3>The Secretariat</h3>
          <h3>World Spice Organisation,</h3>
          <h3>Sughanda Bhavan (Spices Board),</h3>
          <h3>Palarivattom P.O.</h3>
          <h3>Kerala, India – 682 025</h3>
        </div>
        <p className="my-3 text-xs">
          It is required that demand drafts/cheques/bank transfer, details be
          filled into the membership form, mentioned in Step 3.
        </p>

        <p className="font-medium">
          5. Receive Membership confirmation by mail.
        </p>
        <p className="my-3 text-xs">
          Confirmation will be received after receipt of Payment and validation
          by WSO.
        </p>
        <p className="my-3 text-xs">
          Please use the Username and Login details, hence activated and
          received in the confirmation mail, to access the ‘member-only’ pages
          on the web
        </p>
        <p className="my-3 text-xs">
          Welcome to the WSO family and the spice renaissance!
        </p>
        <p className="my-3 text-xs">
          Confirmation will be received after receipt of Payment and validation
          by WSO.
        </p>
      </div>
    </div>
  );
};

export default MemberRegisterProcess;
