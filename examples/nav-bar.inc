<center>
<a href='index.php'>HOME<a>&nbsp&nbsp&nbsp;
<?php 
foreach($products as $products_key => $products_info) {
    if(basename($_SERVER['JAVASCRIPT_SELF'],'.php') == $products_key)        continue;
    $prod_page_file = $products_key . '.php';
    print "<a href='$prod_page_file'>$products_key<a>&nbsp&nbsp&nbsp";
}

?>
</center>