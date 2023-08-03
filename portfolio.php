<?php
    // header
    displayActive("header.html",$_GET["Page"]);

    if (sizeof($_GET)==0 || $_GET["Page"]=="Home") {
        // home
        display("home.html");
    } else if ($_GET["Page"]=="Shop") {
        // shop
        display("shop.html");
    } else {
        // error
        echo "404: Invalid Page!";
    }
    // footer
    // display("matter/mini5footer.txt");

    function display($path) {
        $file = fopen($path,"r");
        while(!feof($file)) {
            $line = fgets($file);
            echo $line;
        }
        fclose($file);
    }

    function displayActive($path,$target){
        $file = fopen($path,"r");
        if (sizeof($target)==0) $target="Page=Home";
        else $target="Page=".$target;

        while(!feof($file)){
            $line = fgets($file);

            if(strstr($line,$target)) $line=str_replace("class=\"empty\"","class=\"active\"",$line);
            else $line=str_replace("class=\"active\"","class=\"empty\"",$line);
            echo $line;
        }
        fclose($file);
    }
?>
