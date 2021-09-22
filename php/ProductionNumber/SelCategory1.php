<?php
  /* 21/04/26作成 */
  $userid = "webuser";
  $passwd = "";
  // print_r($_POST);
  
  try{
    $dbh = new PDO(
      'mysql:host=localhost; dbname=extrusion; charset=utf8',
      $userid,
      $passwd,
      array(
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_EMULATE_PREPARES => false
      )
    );

    $prepare = $dbh->prepare("
      SELECT 
        m_production_numbers_category1.id,
        m_production_numbers_category1.name_jp,
        ifnull(t1.count, 0) AS count
      FROM 
        m_production_numbers_category1
        LEFT JOIN 
        (
          SELECT 
            m_production_numbers_category2.category1_id,
            COUNT(*) AS count
          FROM 
            m_production_numbers_category2
          GROUP BY m_production_numbers_category2.category1_id
        ) AS t1
      ON m_production_numbers_category1.id = t1.category1_id
      WHERE m_production_numbers_category1.id != 0
    ");

    $prepare->execute();
    $result = $prepare->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
  } catch (PDOException $e){
    $error = $e->getMessage();
    echo json_encode($error);
  }
  $dbh = null;
?>
