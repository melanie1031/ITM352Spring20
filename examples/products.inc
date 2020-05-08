<?php
// individual product information
$gb1 = array('name' => 'small gumball', 'price' => 0.1);
$gb2 = array('name' => 'med gumball', 'price' => 0.05);
$gb3 = array('name' => 'large gumball', 'price' => 0.25);

$jb1 = array('name' => 'small jawbreaker', 'price' => 0.10);
$jb2 = array('name' => 'med jawbreaker', 'price' => 0.15);
$jb3 = array('name' => 'large jawbreaker', 'price' => 0.35);

$pb1 = array('name' => 'small peanut butter cup', 'price' => 0.50);
$pb2 = array('name' => 'med peanut butter cup', 'price' => 0.60);
$pb3 = array('name' => 'large peanut butter cup', 'price' => 0.75);

// array of all products
$products = array(
    'gumballs' => array($gb1, $gb2, $gb3),
    'jawbreakers' => array($jb1, $jb2, $jb3),
    'peanut butter cups' => array($pb1, $pb2, $pb3),
        );

// This function takes a string assumed to be a key in the $products array above to display and select the corresponding products
function select_products($products_key, $products_data) {

// get the particular products to display
$products = $products_data[$products_key];
    if (array_key_exists('Submit', $_POST)) {
        // grab the quanities array from the form
        $quantities = $_POST['quantities'];

        $order_str = 'Your order is:<br>';
        for ($i = 0; $i < count($products); $i++) {
            printf('You want %d %s<br>', $quantities[$i], $products[$i]['name']);
        }
    } else {
        print "<h1>Please selects what $products_key you want</h1><br>";
        // We put the whole tabel in the form so that anything entered in it will get submitted
        ?>
        <FORM  action="<?php echo $_SERVER['JAVASCRIPT_SELF'] ?>" method="POST">
            <TABLE BORDER>
                <TR><TD><B><BIG>Description</TD><TD><B><BIG>Price</TD><TD><B><BIG>Quanity Desired</TD></TR>
        <?php
        for ($i = 0; $i < count($products); $i++)
            printf('<TR><TD>%s</TD><TD>$%.2f</TD><TD>
        <INPUT TYPE="TEXT"  name="quantities[%d]" value="0"></TD></TR>', $products[$i]['name'], $products[$i]['price'], $i);
        ?>
                                                        </TABLE>
                                                        <br>
                                                        <INPUT TYPE="SUBMIT"  name="Submit" value="Select">
                                                        </FORM>
        <?php
    } // this closes the else for the form and table display
}
?>