<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "sipinfo@sipacademyindia.com,manikandan@pixel-studios.com";
    $subject = isset($_POST['subject']) ? $_POST['subject'] : 'Contact Form Submission';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $completion_year = isset($_POST['completion_year']) ? $_POST['completion_year'] : '';
    $state = isset($_POST['state']) ? $_POST['state'] : '';
    $city = isset($_POST['city']) ? $_POST['city'] : '';
    $city_other = isset($_POST['city_other']) ? $_POST['city_other'] : '';
    
    // Use city_other if city is "Other"
    if ($city === 'Other' && !empty($city_other)) {
        $city = $city_other;
    }
    
    $location = $city . ', ' . $state; // Combine city and state for backward compatibility
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $contact = isset($_POST['contact']) ? $_POST['contact'] : '';
    $occupation = isset($_POST['occupation']) ? $_POST['occupation'] : '';

    // DB INSERTION SECTION START
    $host = "localhost";
    $dbname = "sipabacuscp_alumni_db";      
    $username = "sipabacuscp_alumni_db_prod";      
    $password = "gYcGE{Vn88LF";      

    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("DB Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO contact_form (name, completion_year, location, email, contact, occupation) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $completion_year, $location, $email, $contact, $occupation);
    $stmt->execute();
    $stmt->close();
    $conn->close();
  // DB INSERTION SECTION END

    // EMAIL SENDING SECTION
    $body = '<html>
   <body>
      <table align="center" style="font-weight: normal;border-collapse: collapse;border: 0;margin-left: auto;margin-right: auto;padding: 0;font-family: Arial, sans-serif;color: #555559;background-color: #ffffff;font-size: 16px;line-height: 26px;width:600px;">
         <tr>
            <td style="border-collapse: collapse;border: 1px solid #CCC;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;">
               <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0;padding: 0;font-family: Arial, sans-serif;" border="0">
                  <tr>
                     <td colspan="4" valign="center" align="center" style="border-collapse: collapse;border: 0;margin: 0;padding: 10px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background-color: #ffffff00; text-align: center;">
                        <a href="https://sipabacus.com/in/" target="_blank"><img src="https://alumni.sipabacus.com/assets/logo.png" width="262" height="59" /></a>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <h3 style="text-align:left;padding:10px;background-color:#249829;color:#ffffff;margin:0px;">Contact Enquiry</h3>
                        <table style="margin-top:0px;padding:20px;width:600px;margin:0px; border-collapse: collapse;width:600px;">
                           <tr style="text-align:left;background-color:#FFF;">
                              <td width="100" style="border:1px solid #dedede;padding:10px;margin:0;">Name</td>
                              <td style="border:1px solid #dedede;margin:0;padding:10px;">'.$name.'</td>
                           </tr>
                           <tr style="text-align:left;background-color:#f4f5f7;">
                              <td style="border:1px solid #dedede;padding:10px;margin:0;">Completion year Id</td>
                              <td style="border:1px solid #dedede;margin:0;padding:10px;">'.$completion_year.'</td>
                           </tr>
                           <tr style="text-align:left;background-color:#FFF;">
                              <td style="border:1px solid #dedede;padding:10px;margin:0;">Location</td>
                              <td style="border:1px solid #dedede;margin:0;padding:10px;">'.$location.'</td>
                           </tr>
                           <tr style="text-align:left;background-color:#f4f5f7;">
                              <td style="border:1px solid #dedede;padding:10px;margin:0;">Email</td>
                              <td style="border:1px solid #dedede;margin:0;padding:10px;">'.$email.'</td>
                           </tr>
                           <tr style="text-align:left;background-color:#FFF;">
                              <td style="border:1px solid #dedede;padding:10px;margin:0;">Contact</td>
                              <td style="border:1px solid #dedede;margin:0;padding:10px;">'.$contact.'</td>
                           </tr>
                             <tr style="text-align:left;background-color:#f4f5f7;">
                              <td style="border:1px solid #dedede;padding:10px;margin:0;">Occupation</td>
                              <td style="border:1px solid #dedede;margin:0;padding:10px;">'.$occupation.'</td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>'; 

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: manikandan@pixel-studios.in\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: thankyou.html");
        exit();
    } else {
        echo "Mail sending failed. Please try again later.";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
