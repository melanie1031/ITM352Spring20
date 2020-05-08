<?php
session_save_path('.'); // don't forget that this path must be R/W by the webserver (System user)
session_start();
?>

<HTML>

    <?php
// individual product information
    $product1 = array('name' => 'small gumball', 'price' => 0.1);
    $product2 = array('name' => 'med gumball', 'price' => 0.5);
    $product3 = array('name' => 'large gumball', 'price' => 0.25);

// array of all products
    $products = array($product1, $product2, $product3);

    /* Handle shopping cart here */

// if the session is new, register a shopping cart
    if (!$_SESSION['cart_quantities']) {
        // start the cart out with no items selected by placing 0 in each product quantity slot
        $cart = array_fill(0, count($products), 0);
        // put the cart in this users session
        $_SESSION['cart_quantities'] = $cart;
    }

// get the $cart array from the current users session
    $cart = $_SESSION['cart_quantities'];

// Check that select_button submit was pressed. We must look for this because we want to be sure the user
// put in quantities for all the items they are interested in
    if (array_key_exists('select_button', $_POST)) {
        // grab the quanities array from the form and replace previous cart quantities with new values
        $cart = $_POST['quantities'];
        // put updated cart into the session (replaces old cart)
        $_SESSION['cart_quantities'] = $cart;
    }

    // dsiplay the shopping cart. We use a function so we can display it on any page in any place we wish
    display_products_cart();

// We put the whole table in the form so that anything entered in it will get submitted
    ?>
    <FORM  action="<?php echo $_SERVER['JAVASCRIPT_SELF'] ?>" method="POST">
        <TABLE BORDER>
            <TR><TD><B><BIG>Description</TD><TD><B><BIG>Price</TD><TD><B><BIG>Quanity Desired</TD></TR>
                                                    <?php
                                                    /* This for-loop creates table rows from the $products array
                                                      Note the HTML "template" for the table rows that gets data
                                                      from the array. Printf() is useful here because it can
                                                      format the data the way we want and it separates this format
                                                      from the data which is placed after the format string. The image files
                                                      (as specified in the products array) must be in the same directory
                                                      as this file or the images won't appear. The text boxes will be named "quantity[$i]"
                                                      were $i will be the counter for the $products loop. This will mean that
                                                      $_POST['quantity'] will be an array with exactly the same number of elements as
                                                      $products and the index for a particular product will correspond to the index in
                                                      the  $_POST['quantity']. That means for example that $product[2] will have corresponding quantity
                                                      (as selected by the user in the text box)  $_POST['quantity'][2]. The default values for the
                                                      text boxes will be taken from the $cart array which is stored in the current user's session. The
                                                      result of this is that whatever is in the user's cart is then placed in the textbox and if the
                                                      user changes the textbox values (the quantities) then when these are posted they will be
                                                      saved in the session then re-posted as default values in this form.
                                                     */

                                                    for ($i = 0; $i < count($products); $i++)
                                                        printf('<TR><TD>%s</TD><TD>$%.2f</TD><TD>
        <INPUT TYPE="TEXT"  name="quantities[%d]" value="%d"></TD></TR>', $products[$i]['name'], $products[$i]['price'], $i, $cart[$i]);
                                                    ?>
                                                    </TABLE>
                                                    <br>
                                                    <INPUT TYPE="SUBMIT"  name="select_button" value="Select Gumballs">
                                                    </FORM>
                                                    </HTML>

<?php

// This function displays the quantities of $the_products stored in $_SESSION['cart_quantities']
// It is assumed that the indices of the quantities in the array $_SESSION['cart_quantities'] match the  
// indicies in the array $products (we make it global to help ensure this)
function display_products_cart() {
    global $products;
    echo 'Your shopping cart:<br>';
    //  Display the selected quantities for each product. Note that this loop is nearly identical to the loop
    // that creates the products table. This is not a coincendence!
    for ($i = 0; $i < count($products); $i++) {
        printf('You want %d %s<br>', $_SESSION['cart_quantities'][$i], $products[$i]['name']);
    }
}
?>