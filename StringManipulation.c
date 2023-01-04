/***************************************************************************
 *   Copyright (C) $Year$ by $Author$   *
 *   $Email$   *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

/*********************************************************************

 1.  NAME
 
 Cource start work: String manipulation program

 2.  DESCRIPTION
Program can manipulate user input string couple of different ways
and save it and read it from .txt file.

 3.  VERSIONS
       Original:
         21.3.2022 / Niko Lepisto

       Version history:

**********************************************************************/

/*-------------------------------------------------------------------*
*    HEADER FILES                                                    *
*--------------------------------------------------------------------*/
#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
/*-------------------------------------------------------------------*
*    GLOBAL VARIABLES AND CONSTANTS                                  *
*--------------------------------------------------------------------*/
/* Control flags */
#define STRING_MAX 12
/*-------------------------------------------------------------------*
*    FUNCTION PROTOTYPES                                             *
*--------------------------------------------------------------------*/
char ask_command();
void display_menu();
void write_file(char String[]);
void read_file(char String[]);
void to_upper(char String[]);
void to_lower(char String[]);
int count_consonants(char String[]);
int count_vowels(char String[]);
void print_string(char String[]);
int read_string(char String[]);
/*********************************************************************
*    MAIN PROGRAM                                                      *
**********************************************************************/
int main(void)  {
    char string[STRING_MAX] = "Terve";
    int b = 1;

    display_menu();
    while (b)    {
        char ok = ask_command();

        switch (ok)   {
            case 'A':
                printf("String has %d vowels\n\n", count_vowels(string));
                break;
            case 'B':
                printf("String has %d consonants\n\n", count_consonants(string));
                break;
            case 'C':
                to_upper(string);
                printf("%s\n\n", string);
                break;
            case 'D':
                to_lower(string);
                printf("%s\n\n", string);
                break;
            case 'E':
                print_string(string);
                break;
            case 'F':
                read_string(string);
                break;
            case 'G':
                read_file(string);
                break;
            case 'H':
                write_file(string);
                break;
            case 'M':
                display_menu();
                break;
            case 'X':
                exit(0);
        }
    }
}
/* end of main */

/*********************************************************************
*    FUNCTIONS                                                       *
**********************************************************************/


/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:Display_menu
 DESCRIPTION:
 This function displays the menu that shows all the other functions that are used to manipulate the string wich is "terve" by default.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
void display_menu(void) {
    printf("\nA) Count the number of vowels in the string\n");
    printf("\nB) Count the number of consonants in the string\n");
    printf("\nC) Convert the string to uppercase\n");
    printf("\nD) Convert the string to lowercase\n");
    printf("\nE) Display the current string\n");
    printf("\nF) Enter another string\n");
    printf("\nG) Read string from file\n");
    printf("\nH) Write string to file\n");
    printf("\nM) Display this menu\n");
    printf("\nX) Exit the program\n");
}
/* End of display_menu() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:Ask_command
 DESCRIPTION:This function asks from the user what function does he wants to use from the menu basicly from A-H and M and X Then sends the information back.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
char ask_command(void)  {
    char command[150];
    while (1)   {
        printf("\nEnter command: ");
        fgets(command, 150, stdin);
        for (int i = 0; command[i] != '\0'; i++)  {
            command[i] = toupper(command[i]);
        }
        if (command[0] != 'A' && command[0] != 'B' && command[0] != 'C' && command[0] != 'D' && command[0] != 'E' && command[0] != 'F' && command[0] != 'G' && command[0] != 'H' && command[0] != 'M' && command[0] != 'X')   {            
            printf("Invalid\n");
        }
        else    {
            break;
        }
    }
    return command[0];
}
/* End of ask_command() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:print_string
 DESCRIPTION:Prints out the string that is saved.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
void print_string(char String[]) {
    int i;
    i=0;
    while(String[i] != '\0')    {
        printf("%c", String[i]);
        i++;
    }
    printf("\n");
}
/* End of print_string() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:read_string
 DESCRIPTION:Reads out the string
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
int read_string(char String[])  {
    printf("New string: ");
    fgets(String , 19, stdin);
    return String[20];
}
/* End of read_string() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:count_vowels
 DESCRIPTION:Counts how many vowels does the string have.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
int count_vowels(char String[]) {
    int c=0;
    int count=0;
    while(String[c] != '\0')    {
        if (String[c] == 'a' || String[c] == 'e' || String[c] == 'i' || String[c] == 'o' || String[c] == 'u' || String[c] == 'A' || String[c] == 'E' || String[c] == 'I' || String[c] == 'O' || String[c] == 'U') 
            count++;
            c++;
    }
    return count;
}
/* End of count_vowels() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:count_consonants
 DESCRIPTION:Counts the consonants that the saved string has.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
int count_consonants(char String[]) {
    int c=0;
    int count=0;
    int counts=0;
    while(String[c] !='\0') {
        if(String[c] == 97 || String[c] == 101 || String[c] == 105 || String[c] == 111 || String[c] == 117 || String[c] == 65 || String[c] == 69 || String[c] == 73 || String[c] == 79 || String[c] == 85 ) {
            counts++;
        }
        else if(String[c] >= 97 && String[c] <= 122 || String[c] >= 65 && String[c] <= 90 ) {
            count++;
        }
        c++;
    }
    return count;
}
/* End of count_consonants() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:to_lower
 DESCRIPTION:Turn the string to lowercase.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
void to_lower(char String[]) {
    int i;
    for(i=0; String[i]; i++) {
        String[i] = tolower(String[i]);
    }
}
/* End of to_lower() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:to_upper
 DESCRIPTION:Turns the string to uppercase.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
void to_upper(char String[]) {
   int i;
    for(i=0; String[i]; i++) {
        String[i] = toupper(String[i]);
    } 
}
/* End of to_upper() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:read_file
 DESCRIPTION:Reads the file when it has been saved the write file function.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
void read_file(char String[])
{
  char line[255];

  FILE *fpointer = fopen("text.txt", "r");

  fgets(line, 255, fpointer);
  puts(line);

  fclose(fpointer);
}
/* End of read_file() */

/*********************************************************************
	F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME:write_file
 DESCRIPTION:Writes the the file saves the string to your computer in text form.
	Input:
	Output:
  Used global variables:
 REMARKS when using this function:
*********************************************************************/
void write_file(char String[])
{
  char line[255];

  FILE *fpointer = fopen("text.txt", "w");
  printf("\n\nWrite : \n");
  fgets(line, 255, stdin);
  fprintf(fpointer, "%s\n", line);
  fclose(fpointer);
}
/* End of write_file() */