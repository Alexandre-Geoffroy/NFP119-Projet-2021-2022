(* NFP119 - Projet session 2021-2022. *)
(*
N'ayent pas réussie a crée le code je vais décrire le fonctionnement que j'aurai voulue crée 
*)

exception Pas_encore_implante
(* Le type qui représente 1 bit. *)
type bit = O | I ;;

(* Le type des arbres binaires de décodage de Huffman. *)
type cle =
| Feuille of char
| Choix of cle * cle;;


(* ****************** DÉCODAGE **************** *)

let rec decode_char (c:cle) (lb:bit list) =
Printf.printf " un truc ";;
(*
Dans l'arbre sélctioner (avec la clef fournie en paramètre de la fonction):
On utilise chaque bit de la liste fournie pour navigé dans l'arbre au travers des noeud (si 0 fils de gauche, si 1 fils de droite),
Une fois arrivé sur une feuille, on vérifier si un char est trouvé, 
Si un char est trouvé alors on le return avec sont code (ex:101)
si non on return false | None

Pour cette fonction je voulais utilisé le programme suivant :
celui ci me permet de trouvé dans un arbre si un caratère existe.
Avec quelque modification de ce code j'aurai pu l'adapté a nos besoins avec les 1 et 0 de la liste de bit.
Mais par manque de temps j'e n'ai pas pu.


let rec existe cond = function
    Feuille x  ->  cond x
  | Choix (g,d) -> existe cond g || existe cond d;;


existe (fun x -> x = 'B') (cle1);;
existe (fun x -> x = 'r') (cle1);;
existe (fun x -> x = 'k') (cle1);;
existe (fun x -> x = 'o') (cle1);;
existe (fun x -> x = ' ') (cle1);;
 *)



let decode (lb:bit list) (c:cle): string =
raise Pas_encore_implante
(*
Cette contion est similaire a "decode_char" au dessus
sauf que au lieux de retourner un seul char on retoune la concaténation des char trouvé.

ex : résultat = résultat + (char trouvé);;
Voila
*)




let encode_char ch cle =
raise Pas_encore_implante
(*
Dans l'arbre sélctioner (avec la clef fournie en paramètre de la fonction):
On cherche si le caratère fournie en paramètre existe ou non
Si un char est trouvé alors on le return avec sont code (ex:101)
si non on return false

Pour cette fonction je voulais utilisé le programme ci-dessous :
celui ci me permet de trouvé dans un arbre si un caratère existe.
Avec quelque modification j'airai pu ajouté le fait qu'elle retoune la liste de bit.
Car avec cette fonction 80% tu travaille etait bon
Mais par manque de temps je n'ai pas pu.

let rec existe cond = function
    Feuille x  ->  cond x
  | Choix (g,d) -> existe cond g || existe cond d;;

existe (fun x -> x = 'B') (cle1);;
existe (fun x -> x = 'r') (cle1);;
existe (fun x -> x = 'k') (cle1);;
existe (fun x -> x = 'o') (cle1);;
existe (fun x -> x = ' ') (cle1);;
 
*)


let decomp_cle (c:cle): (char*bit list) list =
raise Pas_encore_implante
(*Fonction non demander*)






(* ******************  TESTS  **************** *)

(******** Fonction utiles pour les tests *******)

(* Pour traduire une chaine de 0 et 1 vers le type 'bit list'. *)
let string_to_bit_list s =
  let rec string_to_bit_list_rec s i acc =
    if i >= String.length s then acc
    else 
      let new_bit = 
        match s.[i] with
        | '0' -> O
        | '1' -> I
        | _ -> failwith "la chaine ne doit contenir que des 0 et des 1" in
      string_to_bit_list_rec s (i+1) (new_bit::acc)
  in
  List.rev (string_to_bit_list_rec s 0 []) ;;

(* Fonction de test générique:

 [gen_test compressee cle attendue] lève une exception si la
   décompression de [compressee] avec la clé [cle] retourne une chaîne
   différente de [attendue]. *)
let gen_test compresse cle attendue =
  let obtenue = decode (string_to_bit_list compresse) cle in
  if String.compare obtenue attendue = 0
  then print_string "test OK\n"
  else
    begin
      print_string ("test échoué!"^
                      "\n==> attendue: "^attendue^
                        "\n==> obtenue: "^obtenue^"\n");
      failwith "test échoué"
    end;;

(* Deuxième fonction générique de test: cette fois pour tster que la
   décompression échoue avec une exception. À utiliser si votre
   fonction peut échouer. *)
let gen_test_fail chaine_compresse cle =
  try
    let _ = decode (string_to_bit_list chaine_compresse) cle in
    failwith ("Ce test aurait dû échouer: chaine compressé: "^chaine_compresse)
  with
  | _ -> print_string "test OK\n" (* Une exception a été levée, le test est OK *)

(*************** début des tests *****************)
(* arbre de l'énoncé *)
let cle1 =
  Choix
    (Choix
       (Choix (
            Feuille 'B',
            Feuille 'e'),
        Choix (
            Feuille 'n',
            Feuille ' ')),
     Choix
       (Choix
          (Choix
             (Feuille 'r',
              Feuille 'u'),
           Choix
             (Feuille 'm',
              Feuille 'l')),
        Choix (
            Choix (
                Feuille 'j',
                Feuille 'd'),
            Feuille 'o')))

(* En principe tous les tests suivant diovent réussir *)
let _ = gen_test "0011000" cle1 "er";;

let _ = gen_test_fail "0011000" cle1;;

let s2 = gen_test "000111010110011110011000" cle1 "Bonjour";;

let s3 = gen_test "000111010110011110011000011101100101110101110101101001" cle1 "Bonjour le monde";;

(* Autre clé correspondant au texte: "longtemps je me suis conché de bonne heure". *)
let cle2=
  Choix
    (Choix (* 0 *)
       (Choix ( (*0*)
            Choix ((* 0 *)
                Feuille 'c',(* 0 *)
                Choix (Feuille '.', Feuille 'r')),(* 1 *)
            Choix ((* 1 *)
                Choix ((* 0 *)
                    Feuille '\169',(* 0 *)
                    Feuille '\195'),(* 1 *)
                Choix ((* 1 *)
                    Feuille 't',(* 0 *)
                    Feuille 'p'))),(* 1 *)
        Choix(* 1 *)
          (Choix(* 0 *)
             (Choix(* 0 *)
                (Feuille 'i',(* 0 *)
                 Feuille 'j'),(* 1 *)
              Choix ((* 1 *)
                  Feuille 'g',(* 0 *)
                  Feuille 'b')),(* 1 *)
           Choix ((* 1 *)
               Choix ((* 0 *)
                   Feuille 'd',(* 0 *)
                   Feuille 'L'),(* 1 *)
               Feuille 'u'(* 1 *)
       ))),
     Choix ((* 1 *)
         Choix ((* 0 *)
             Choix ((* 0 *)
                 Feuille 's',(* 0 *)
                 Feuille 'n'),(* 1 *)
             Feuille 'e'(* 1 *)
           ),
         Choix ((* 1 *)
             Feuille ' ',(* 0 *)
             Choix ((* 1 *)
                 Feuille 'o',(* 0 *)
                 Choix ((* 1 *)
                     Feuille 'h',(* 0 *)
                     Feuille 'm'(* 1 *)
    )))));;


let _ = gen_test "1000" cle2 "s";;
let _ = gen_test "0000" cle2 "c";;
let _ = gen_test "00110" cle2 "t";;

let _ = gen_test "1000001100000" cle2 "stc";;

let _ = gen_test_fail "0011000" cle2;;

let s3 = gen_test "000111010110011110011000011101100101110101110101101001" cle2 "Bonjour le monde";;