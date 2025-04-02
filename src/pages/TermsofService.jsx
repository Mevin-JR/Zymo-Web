import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const TermsofService = ({ title }) => {
    const navigate=useNavigate();
     useEffect(() => {
   
            document.title = title;
        }, [title]);
    return (
        <>
           <Helmet>
                <title>{title}</title>
                <meta name="description" content="Read Zymo's terms and conditions to understand our rental policies, user responsibilities, and service guidelines." />
                <link rel="canonical" href="https://zymo.app/terms-of-service" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Read Zymo's terms and conditions to understand our rental policies, user responsibilities, and service guidelines." />
            </Helmet>
            <NavBar />
            <button
                onClick={() => navigate("/")}
                className="text-white m-5 cursor-pointer"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
                <div className="max-w-4xl  p-8">
                    <h1 className="text-2xl font-bold text-[#faffa4] mb-6">
                        Terms of Service
                    </h1>
                    <hr />
                    <br />
                    <p className=" mb-4">LAST REVISION: [03-March-2023]</p>
                    <p className=" mb-4">
                        PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY.
                        BY USING THIS WEBSITE/MOBILE APPLICATION YOU AGREE TO BE
                        BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS
                        AGREEMENT.
                    </p>
                    <p className=" mb-4">
                        This Terms of Service Agreement (the "Agreement")
                        governs your use of this Website/Mobile Application,
                        www.zymo.app (the "Website/Mobile Application "), 
                        Zep Tepi Technologies Pvt Ltd
                         ("Business Name") offer of products
                        for rent on this Website/Mobile Application. This
                        Agreement includes, and incorporates by this reference,
                        the policies and guidelines referenced below. 
                        Zep Tepi Technologies Pvt Ltd
                         reserves the right to change or
                        revise the terms and conditions of this Agreement at any
                        time by posting any changes or a revised Agreement on
                        this Website/Mobile Application. Zep Tepi Technologies Pvt Ltd
                         will alert you that changes or revisions have been
                        made by indicating on the top of this Agreement the date
                        it was last revised. The changed or revised Agreement
                        will be effective immediately after it is posted on this
                        Website/Mobile Application. Your use of the
                        Website/Mobile Application following the posting any
                        such changes or of a revised Agreement will constitute
                        your acceptance of any such changes or revisions.
                        Zep Tepi Technologies Pvt Ltd
                        encourages you to review this
                        Agreement whenever you visit the Website/Mobile
                        Application to make sure that you understand the terms
                        and conditions governing use of the Website/Mobile
                        Application. This Agreement does not alter in any way
                        the terms or conditions of any other written agreement
                        you may have with Zep Tepi Technologies Pvt Ltd for other
                        products or services. If you do not agree to this
                        Agreement (including any referenced policies or
                        guidelines), please immediately terminate your use of
                        the Website/Mobile Application.
                    </p>
                    <p className=" mb-4">
                        Ⅰ. PRODUCTS ON RENT Terms of Offer: This Website/Mobile
                        Application offers for rent of its products (the
                        "Products"). By placing an order for Products through
                        this Website/Mobile Application, you agree to the terms
                        set forth in this Agreement. We may add products to our
                        Website/Mobile Application at our own discretion and
                    </p>
                    <p className=" mb-4">
                        Customer Solicitation: Unless you notify our or Alliance
                        Partners or third-party call center reps or 
                        direct Zep Tepi Technologies Pvt Ltd
                         , while they are calling you, of
                        your desire to opt out from further direct company
                        communications and solicitations, you are agreeing to
                        continue to receive further emails and call
                        solicitations.
                    </p>
                    <p className=" mb-4">
                        Opt Out Procedure: We provide 3 easy ways to opt out of
                        from future solicitations. 1. You may use the opt out
                        link found in any email solicitation that you may
                        receive. 2. You may also choose to opt out, via sending
                        your email address to: hello@zymo.app 3. You may send a
                        written remove request to I/2002 Marina Enclave,
                        Jankalyan Nagar, Malad west, Mumbai, MH-400095.
                    </p>
                    <p className=" mb-4">Ⅱ. WEBSITE/MOBILE APPLICATION</p>
                    <p className=" mb-4">
                        Content; Intellectual Property; Third Party Links. In
                        addition to making Products available, this
                        Website/Mobile Application also offers information and
                        marketing materials of Alliance Partners. This
                        Website/Mobile Application also offers information, both
                        directly and through indirect links to third-party
                        Website/Mobile Applications, about its products. Zep Tepi Technologies Pvt Ltd does not always create the
                        information offered on this Website/Mobile Application;
                        instead the information is often gathered from other
                        sources. To the extent that Zep Tepi Technologies Pvt Ltd
                        does create the content on this Website/Mobile
                        Application, such content is protected by intellectual
                        property laws of the India, foreign nations, and
                        international bodies. Unauthorized use of the material
                        may violate copyright, trademark, and/or other laws. You
                        acknowledge that your use of the content on this
                        Website/Mobile Application is for personal,
                        noncommercial use. Any links to third-party
                        Website/Mobile Application s or persons associated with
                        us in the name of Alliance Partners are provided solely
                        as a convenience to you Zep Tepi Technologies Pvt Ltd does
                        not endorse the contents on any such third-party
                        Website/Mobile Application s. Zep Tepi Technologies Pvt Ltd
                        is not responsible for the content of or any damage that
                        may result from your access to or reliance on these
                        third-party Website/Mobile Application s. If you link to
                        third-party Website/Mobile Application s, you do so at
                        your own risk.
                    </p>
                    <p className=" mb-4">
                        Use of Website/Mobile Application: Zep Tepi Technologies Pvt Ltd
                        is not responsible for any damages resulting from
                        use of this Website/Mobile Application by anyone. You
                        will not use the Website/Mobile Application for illegal
                        purposes. You will (1) abide by all applicable local,
                        state, national, and international laws and regulations
                        in your use of the Website/Mobile Application (including
                        laws regarding intellectual property), (2) not interfere
                        with or disrupt the use and enjoyment of the
                        Website/Mobile Application by other users, (3) not
                        resell material on the Website/Mobile Application , (4)
                        not engage, directly or indirectly, in transmission of
                        "spam", chain letters, junk mail or any other type of
                        unsolicited communication, and (5) not defame, harass,
                        abuse, or disrupt other users of the Website/Mobile
                        Application.
                    </p>
                    <p className=" mb-4">
                        License: By using this Website/Mobile Application, you
                        are granted a limited, non- exclusive, non-transferable
                        right to use the content and materials on the
                        Website/Mobile Application in connection with your
                        normal, noncommercial, use of the Website/Mobile
                        Application. You may not copy, reproduce, transmit,
                        distribute, or create derivative works of such content
                        or information without express written authorization
                        from Zep Tepi Technologies Pvt Ltd or the applicable third
                        party (if third party content is at issue).
                    </p>
                    <p className=" mb-4">
                        Posting: By posting, storing, or transmitting any
                        content on the Website/Mobile Application, you hereby
                        grant Zep Tepi Technologies Pvt Ltd a perpetual, worldwide,
                        non-exclusive, royalty-free, assignable, right and
                        license to use, copy, display, perform, create
                        derivative works from, distribute, have distributed,
                        transmit and assign such content in any form, in all
                        media now known or hereinafter created, anywhere in the
                        world. Zep Tepi Technologies Pvt Ltd does not have the
                        ability to control the nature of the user-generated
                        content offered through the Website/Mobile Application
                        and nor of its products. You are solely responsible for
                        your interactions with other users of the Website/Mobile
                        Application and any content you post. Zep Tepi Technologies Pvt Ltd
                         is not liable for any damage or harm resulting
                        from any posts by or interactions between users. 
                        Zep Tepi Technologies Pvt Ltd 
                        reserves the right, but has no
                        obligation, to monitor interactions between and among
                        users of the Website/Mobile Application and to remove
                        any content Zep Tepi Technologies Pvt Ltd deems
                        objectionable, in its sole discretion.
                    </p>
                    <p className=" mb-4">Ⅲ. DISCLAIMER OF WARRANTIES</p>
                    <p className=" mb-4">
                    Your use of this website/mobile application and/or products for rent are at your risk and associated with the alliance partner with whom we will be associated with. The website/mobile application and products are offered on rent an "as is" and "as available" basis. Zep Tepi Technologies Pvt Ltd is mere a expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, product warranty for a particular purpose and non-infringement with respect to the products or website/mobile application content, or any reliance upon or use of the website/mobile application content or products. ("products" include trial products.)
                    </p>
                    <p className=" mb-4">
                    Without limiting the generality of the foregoing, Zep tepi technologies pvt ltd  makes no warranty.
                    </p>
                    <p className=" mb-4">
                    That the information provided on this website/mobile application is accurate, reliable, complete, or timely.
                    </p>
                    <p className=" mb-4">
                    That the links to third-party website/mobile application s are to information that is accurate, reliable, complete, or timely.
                    </p>
                    <p className=" mb-4">
                    No advice or information, whether oral or written, obtained by you from this website/mobile application will create any warranty not expressly stated herein.
                    </p>
                    <p className=" mb-4">
                    As to the results that may be obtained from the use of the products or that defects in products will be corrected by alliance partners only.
                    </p>
                    <p className=" mb-4">
                    Regarding any products obtained on rent through the website/mobile application Zep Tepi Technologies Pvt Ltd will not be responsible on the fullfillment and you will have to adhere to the terms and conditions of the alliance partner whoes product you will obtain on rent.
                    </p>
                    <p className=" mb-4">
                    Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.
                    </p>{" "}
                    <p className=" mb-4">Ⅳ. LIMITATION OF LIABILITY</p>{" "}
                    <p className=" mb-4">
                    Zep tepi technologies pvt ltd entire liability, and your
                        exclusive remedy, in law, in equity, or othwerwise, with
                        respect to the website/mobile application content and
                        products and/or for any breach of this agreement is
                        solely limited to the amount you paid, less shipping and
                        handling, for products hired on rent via the
                        website/mobile application.

                    </p>{" "}
                    <p className=" mb-4">
                    Zep tepi technologies pvt ltd will not be liable for any
                        direct, indirect, incidental, special or consequential
                        damages in connection with this agreement or the
                        products in any manner, including liabilities resulting
                        from (1) the use or the inability to use the
                        website/mobile application content or products; (2) the
                        cost of procuring substitute products or content; (3)
                        any products hired on rent or obtained or transactions
                        entered into through the website/mobile application ; or
                        (4) any lost profits you allege.



                    </p>{" "}
                    <p className=" mb-4">
                    Some jurisdictions do not allow the limitation or
                        exclusion of liability for incidental or consequential
                        damages so some of the above limitations may not apply
                        to you.


                    </p>{" "}
                    <p className=" mb-4">Ⅴ. INDEMNIFICATION</p>{" "}
                    <p className=" mb-4">
                        You will release, indemnify, defend and hold harmless
                        Zep Tepi Technologies Pvt Ltd , and any of its contractors,
                        agents, employees, officers, directors, shareholders,
                        affiliates and assigns from all liabilities, claims,
                        damages, costs and expenses, including reasonable
                        attorneys' fees and expenses, of third parties relating
                        to or arising out of (1) this Agreement or the breach of
                        your warranties, representations and obligations under
                        this Agreement; (2) the Website/Mobile Application
                        content or your use of the Website/Mobile Application
                        content; (3) the Products you have hired on rent 4) any
                        intellectual property or other proprietary right of any
                        person or entity; (5) your violation of any provision of
                        this Agreement; or (6) any information or data you
                        supplied to Zep Tepi Technologies Pvt Ltd . When Zep Tepi Technologies Pvt Ltd is threatened with suit or sued by a
                        third party, Zep Tepi Technologies Pvt Ltd may seek written
                        assurances from you concerning your promise to indemnify
                        Zep Tepi Technologies Pvt Ltd ; your failure to provide such
                        assurances may be considered by Zep Tepi Technologies Pvt Ltd
                        to be a material breach of this Agreement. Zep Tepi Technologies Pvt Ltd will have the right to participate
                        in any defense by you of a third-party claim related to
                        your use of any of the Website/Mobile Application
                        content or Products, with counsel of Zep Tepi Technologies Pvt Ltd
                        choice at its expense. Zep Tepi Technologies Pvt Ltd
                        will reasonably cooperate in any defense by you of a
                        third-party claim at your request and expense. You will
                        have sole responsibility to defend Zep Tepi Technologies Pvt Ltd
                         against any claim, but you must receive Zep Tepi Technologies Pvt Ltd prior written consent regarding any
                        related settlement. The terms of this provision will
                        survive any termination or cancellation of this
                        Agreement or your use of the Website/Mobile Application
                        or Products.
                    </p>{" "}
                    <p className=" mb-4">Ⅵ. AGREEMENT TO BE BOUND</p>
                    <p className=" mb-4">
                        By using this Website/Mobile Application or ordering
                        Products, you acknowledge that you have read and agree
                        to be bound by this Agreement and all terms and
                        conditions on this Website/Mobile Application along with
                        the terms and conditions of the alliance partners.
                    </p>
                    <p className=" mb-4">Ⅶ. GENERAL</p>
                    <p className=" mb-4">
                        Force Majeure. Zep Tepi Technologies Pvt Ltd will not be
                        deemed in default hereunder or held responsible for any
                        cessation, interruption or delay in the performance of
                        its obligations hereunder due to earthquake, flood,
                        fire, storm, natural disaster, act of God, war,
                        terrorism, armed conflict, labor strike, lockout, or
                        boycott.
                    </p>{" "}
                    <p className=" mb-4">
                        Cessation of Operation. Zep Tepi Technologies Pvt Ltd may at
                        any time, in its sole discretion and without advance
                        notice to you, cease operation of the Website/Mobile
                        Application and distribution of the Products.
                    </p>{" "}
                    <p className=" mb-4">
                        Entire Agreement. This Agreement comprises the entire
                        agreement between you and Zep Tepi Technologies Pvt Ltd and
                        supersedes any prior agreements pertaining to the
                        subject matter contained herein.
                    </p>{" "}
                    <p className=" mb-4">
                        Effect of Waiver. The failure of Zep Tepi Technologies Pvt Ltd
                        to exercise or enforce any right or provision of
                        this Agreement will not constitute a waiver of such
                        right or provision. If any provision of this Agreement
                        is found by a court of competent jurisdiction to be
                        invalid, the parties nevertheless agree that the court
                        should endeavor to give effect to the parties'
                        intentions as reflected in the provision, and the other
                        provisions of this Agreement remain in full force and
                        effect.
                    </p>{" "}
                    <p className=" mb-4">
                        Governing Law; Jurisdiction. This Website/Mobile
                        Application originates from the Mumbai, Maharashtra.
                        This Agreement will be governed by the laws of the State
                        of Maharashtra without regard to its conflict of law
                        principles to the contrary. Neither you nor Zep Tepi Technologies Pvt Ltd will commence or prosecute any suit,
                        proceeding or claim to enforce the provisions of this
                        Agreement, to recover damages for breach of or default
                        of this Agreement, or otherwise arising under or by
                        reason of this Agreement, other than in courts located
                        in State of Maharashtra. By using this Website/Mobile
                        Application or ordering Products, you consent to the
                        jurisdiction and venue of such courts in connection with
                        any action, suit, proceeding or claim arising under or
                        by reason of this Agreement. You hereby waive any right
                        to trial by jury arising out of this Agreement and any
                        related documents.
                    </p>{" "}
                    <p className=" mb-4">
                        Statute of Limitation. You agree that regardless of any
                        statute or law to the contrary, any claim or cause of
                        action arising out of or related to use of the
                        Website/Mobile Application or Products or this Agreement
                        must be filed within one (1) year after such claim or
                        cause of action arose or be forever barred.
                    </p>{" "}
                    <p className=" mb-4">
                        Waiver of Class Action Rights. BY ENTERING INTO THIS
                        AGREEMENT, YOU HEREBY IRREVOCABLY WAIVE ANY RIGHT YOU
                        MAY HAVE TO JOIN CLAIMS WITH THOSE OF OTHER IN THE FORM
                        OF A CLASS ACTION OR SIMILAR PROCEDURAL DEVICE. ANY
                        CLAIMS ARISING OUT OF, RELATING TO, OR CONNECTION WITH
                        THIS AGREEMENT MUST BE ASSERTED INDIVIDUALLY.
                    </p>{" "}
                    <p className=" mb-4">
                        Termination. Zep Tepi Technologies Pvt Ltd reserves the right
                        to terminate your access to the Website/Mobile
                        Application if it reasonably believes, in its sole
                        discretion, that you have breached any of the terms and
                        conditions of this Agreement. Following termination, you
                        will not be permitted to use the Website/Mobile
                        Application and Zep Tepi Technologies Pvt Ltd may, in its
                        sole discretion and without advance notice to you,
                        cancel any outstanding orders for Products. If your
                        access to the Website/Mobile Application is terminated,
                        Zep Tepi Technologies Pvt Ltd reserves the right to exercise
                        whatever means it deems necessary to prevent
                        unauthorized access of the Website/Mobile Application.
                        This Agreement will survive indefinitely unless and
                        until Zep Tepi Technologies Pvt Ltd chooses, in its sole
                        discretion and without advance to you, to terminate it.
                    </p>{" "}
                    <p className=" mb-4">
                        Domestic Use. Zep Tepi Technologies Pvt Ltd makes no
                        representation that the Website/Mobile Application or
                        Products are appropriate or available for use in
                        locations outside India. Users who access the
                        Website/Mobile Application from outside India do so at
                        their own risk and initiative and must bear all
                        responsibility for compliance with any applicable local
                        laws. Assignment. You may not assign your rights and
                        obligations under this Agreement to anyone. Zep Tepi Technologies Pvt Ltd may assign its rights and
                        obligations under this Agreement in its sole discretion
                        and without advance notice to you.
                    </p>{" "}
                    <p className=" mb-4">
                        BY USING THIS WEBSITE/MOBILE APPLICATION OR RENTING
                        PRODUCTS FROM THIS WEBSITE/MOBILE APPLICATION YOU AGREE
                        TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS
                        AGREEMENT AND ALLIANCE PARTNERS WHOES PRODUCT YOU ARE
                        HIRING ON RENT.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsofService;
