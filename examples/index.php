<?php 
require 'products.inc';

print 'Go to: <br>';
$i=0;
foreach($products as $products_key => $products_info) {
    $i++;
    $prod_page_file = $products_key . '.php';
    print "<a href='$prod_page_file'>$i. $products_key<a><br>";
}
?>