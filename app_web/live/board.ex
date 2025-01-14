defmodule AppWeb.Trello.Board do
  @moduledoc """
  Stateful components Demo Page with the following comments:
  1) Define the Title of the page;
  2) Every page can be the landing page for the application and thus should validate if the CSS and JS files being used are
     the latests, ie, if they are updated (as set in the "root layout" comment (5));

  Version 1 Functionalities on Boards Page:
    Sidebar:
      1) An arrow on the top right that can be used for hiding/showing of the sidebar
      2) A title of the board you are currently vieweing. If you click on it, you can access the board settings, which include:
          a) Editing name
          b) Editing image with browse button or drag and drop image in a box
          c) Delete button with a confirmation prompt before deletion
      3) Members section:
          a) A plus button on the top right of the section, which opens settings, including:
              i) Popup with select input with available options - all registered users who are not members of the board right now
          b) A list of members of the board:
              i) First member is the owner of the board
              ii) Every next member is not the owner and can be removed by the owner using the minus button on the right
      4) Your boards sectiion:
          a) A plus button on the top right of the section, which opens popup for new board creation, consisting of:
              i) Name of the new board (it will default to Unnamed Board if left blank)
              ii) Image input with browse button or drag and drop image in a box for the board (it has a default image if left empty)
          b) A list of all your boards with links to them
    Main screen:
      1) Horizontal scroll for all lists, finishing with a "Add another list" button:
          a) The list will only ask you for the new list name to be created. If left empty, it will default to "Unnamed List"
      2) Lists:
          a) They have a maximum height and inner vertical scroll for the cards. The "Add a card" button should be visible at all times on the bottom.
          b) On the top right of every list there is a button for setting, which include:
              i) Rename list functionality
              ii) Move left button, which will be disabled if the list is the first one in the current order
              iii) Move right button, which will be disabled if the list is the last one in the current order
              iv) Add a card button, which will scroll the cards to the bottom (if there is a scroll for the cards), and show the create card input field on
                  the bottom of the cards. It will also hide the "Add a card" button and show buttons for creating the card with the name in the input or cancelling.
              v) Delete list button, which will prompt confirmation for the deletion if cilcked
          c) Add a card button that will scroll the list of cards to the bottom (if there is a scroll for the cards), and show the create card input field on
             the bottom of the cards. It will also hide the "Add a card" button and show buttons for creating the card with the name in the input or cancelling.
      3) Cards:
          a) Displayed vertically in each list, with possibility to be dragged and dropped in other lists. If dropped outside viable area, it will return
             to its original location
          b) When clicked a card will show the details of the card, including:
              i) Name of the card - if you click on it, it will turn into an input and you can change the name of the card
              ii) Description of the card - if you click on it, it will turn into an input and you can change the description of the card
              iii) Labels - if clicked on an existing label or the plus button on the right of the existing labels, it will open the labels popup on the right.
                   You can also open the labels popup on the right by clicking on the "Labels" button on the right. The labels popup includes:
                    - Selecting/deselecting existing labels
                    - Editing label on the right of each label, which includes:
                        * Label name
                        * Label color with color input (it will default to that same color in rgb with opacity of the color of 0.7 (so actually rgba))
                        * If the label is global or not (a global label will be accessible across all your boards)
                    - Creating a new label, which includes:
                        * Label name
                        * Label color with color input (it will default to that same color in rgb with opacity of the color of 0.7 (so actually rgba))
                        * If the label is global or not (a global label will be accessible across all your boards)
              iv) Due Date:
                    - it can be edited by the button on the right, which opens a popup with:
                        * A calendar input, which will add the due date when you click on any date on it
                        * A "Clear Due Date" button to delete the due date from the card
                    - when a datehour is in the past, it will add a background color of red and the text "Overdue" to the display of the due date in the card
                    - when there are less than 24 hours until the due date, it will add the background color of yellow and text "Due Soon"
                    - when the checkmark on the left of the due date is checked, it will add the background color of green and the text "Completed"
              v) Delete Card:
                    - It will display a prompt with confirmation for the card deletion
          c) When clicked on any label on a card, it will swtich between color-only display of the labels and color-and-name display of the labels

  Version 2 Functionalities on Boards Page:
    Sidebar:
      1) Members are now separated into members and owners with the difference that owners are able to add and remove members/owners from the board
      2) Members:
          a) Added separation between members and owners for the add/remove members functionalities:
              i) An owner can perform all actions integrated into a board
              ii) A member cannot:
                  - Edit board (name and background image)
                  - Delete board
                  - Delete lists
                  - Delete cards
                  - Add new members
                  - Remove existing members
          b) Added star icon in front of owners to distinguish them from members
          c) Removed the @domain part of the user when displayed in the Members
          d) Added edit member's role functionality (it is triggered when you click on a member)
          e) Added confirmation for removing a member or yourself from a board (if you remove yourself, you will be redirected to the /boards page)
    Main screen:
      1) Cards:
          a) Labels:
              i) Adjusted labels logic to show the labels to both members and owners of a board
          b) Description:
              i) Adjusted the description to take raw html and support multiple lines of code
          c) Activity:
              i) Added the activity section which follows these principles:
                  - There should be an automatically generated activity with the card creation that states the user and time of creation of the card
                  - You can add comments to the card (textarea should be automatically expandable as you write)
                  - You can edit your own comments if you want to (textarea should be automatically expandable, and if you save your edit, an "(Edited)" text
                    should appear on the right of the datetime of the comment creation)

  Version 3 Functionalities on Boards Page:
    Sidebar:
      1) Checkbox toggle:
          a) In unchecked state it shows all cards ; in checked state it shows only cards that the current user is assigned to
          b) It calculates the number of assigned per user cards in every list and hides the lists that will appear empty if the checkbox is checked
          c) If the user has the checkbox checked and tries to create a new list, the new list will be visible to him
          d) If the user has the checkbox checked and tries to create a new card, he will automatically be assigned to that card and so it will be visible
      2) Members:
          a) Make the list of options in editing a member be dynamic, so that a board can never be without an owner (if you are the only owner, you will
             not be able to change yourself to member)
          b) Added full email address in the edit member block
    Main screen:
      1) Cards:
          a) Members:
              i) Added members section in the selected card
              ii) Enabled the Join/Leave card functionality in the sidebar of the selected card
              iii) Added popup to appear when "Members" is clicked in the sidebar of a detailed card. In the popup you can:
                  - Add new members to the card (if you are an owner of the board)
                  - Remove members from the board (you can only remove yourself if you are not an owner of the board)
          b) Activity:
              i) Disabled "Add comment" button if the textarea field is empty
              ii) Disabled "Edit comment" field if the textarea field is empty or the text in it is the same as the original comment
              iii) Integrated "Delete comment" functionality with confirmation prompt
          c) Checklists:
              i) Create checklist by the sidebar in the detailed card by just giving it a name
              ii) You can delete a checklist by the trash icon on the right of each list
              iii) You can add new checkboxes to a checklist by the button on the bottom of each checklist
              iv) You can edit or delete checkboxes by the buttons on the right of each checkbox
              v) The progress of the checklist is automaticaly calculated and visually represented between the checlist name and the checkboxes. When the
                 progress reaches 100%, the line will turn green
          d) Attachments:
              i) You can add new attachemnts to a card by the sidebar of the detailed card, where you can:
                  - Attach a file:
                      * You can either drag and drop a file or use the browse button and then click the "Upload file" button
                  - Attach a link:
                      * You should fill the appropriate fields and click the "Upload link" button (if the display name is left blank, it will take the
                        value of the path given)
                  - You can switch between the two by the toggle on the top of the popup
              ii) Attachments are separated and displayed under 2 separate categories:
                  - Links:
                      * You can delete or edit their display_name or path by the appropriate buttons on the right
                      * Every link will open in a new tab when clicked
                  - Files:
                      * You can delete or edit their display_name by the appropriate buttons on the right
                      * Every file can be downloaded by simply clicking on them

  Version 4 Functionalities on Boards Page:
    1) Create schema and context files and connect it to the functions

  Version 5 Functionalities on Board Page:
    0) Upgraded phoenix liveview to version 1.0
    1) PubSub added for all actions
    2) Deleted unnecessary js hooks
    3) Added handling for no board found case, that can occur in any of these cases:
      a) Manually navigating to URL of board that does not exist
      b) A board is being deleted while you are currently in it
      c) You are removed from the owners/members list of a board that you are currently in
    4) Integrate translations for all 6 languages (en, pt, de, it, es, fr)
    Main screen:
      1) Cards
          a) Labels:
              i) Fix labels logic so that the label schema will update with new members in board so that the labels will be visible to everybody involved
          b) Checklists:
              i) Added ordering so that checklists would stay in the same order after editing any
          c) Due Date:
              i) Fixed issue with calendar when selecting date
          d) Description:
              i) Updated regex expression to also catch <br> tags in the check of the field that controls if the default text is visualized

  Version 6 Functionalities on Board Page:
    Sidebar:
      1) Checkbox toggle:
          a) Created a cookie that is being set on each click, so that the prefered view of the user would be saved for 1 month
    Main screen:
      1) Cards
          a) Activity
              i) Added activity entry for each card movement across lists (it will only be added if the movement is to a different than the current list)
              ii) Show/Hide details button to show/hide the card movements information in the section. By default it is set to false (not show that information)
              iii) The Hide/Show details button will only appear if there is at least on hidden entry in the activity list of the card
          b) Labels
              i) Now there are 5 default global labels, available in all boards (they can't be edited or deleted)
              ii) You can now delete labels that you have created and all labels are board-specific (with the only exception of the default labels)
              iii) You only need to add label name and its color now to create a new label, the global checkmark is removed and will later on be added for admin

  """
  use AppWeb, :live_view
  alias Phoenix.LiveView.JS
  import AppWeb.Calendar
  import AppWeb.Tooltip
  import AppWeb.Downloadable
  alias App.Accounts
  alias App.Trello
  alias Phoenix.PubSub
  alias App.Repo

  def mount(params, session, socket) do
    case Repo.get(Trello.Board, String.to_integer(params["id"])) do
      nil ->
        # Handle the case where no record was found
        {:ok,
          socket
          |> put_flash(:error, "Board not found")
          |> redirect(to: ~p"/boards")}

      _record ->
        # Record was found, proceed normally
        if connected?(socket) do
          PubSub.subscribe(App.PubSub, "board_update")
        end

        socket =
          socket
          |> assign(boards: Enum.sort_by(Enum.filter(Trello.list_boards_with_lists(), fn board -> socket.assigns.current_user.email in board.owners or socket.assigns.current_user.email in board.members end), fn board -> board.id end))
          |> assign(labels: Enum.sort_by(Enum.filter(Trello.list_labels(), fn label -> label.board == 0 end), fn label -> label.id end) ++ Enum.sort_by(Enum.filter(Trello.list_labels(), fn label -> socket.assigns.current_user.email in label.user end), fn label -> label.id end))
          |> assign(users: Accounts.list_users())
          |> assign(current_board_id: String.to_integer(params["id"]))

        socket =
          socket
          |> assign(current_board: Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id))
          |> assign(lists: Enum.sort_by(Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id).lists, fn list -> list.order end))
          |> assign(selected_card: nil)
          |> assign(label_text_visible: false)
          |> assign(new_card_name: "")
          |> assign(new_list_name: "")
          |> assign(new_board_member_email: nil)
          |> assign(new_board_member_role: nil)
          |> assign(new_card_member_email: nil)
          |> assign(new_comment: "")
          |> assign(edit_comment: "")
          |> assign(cards_toggle: (if session["cards_filtered_visibility"] == "true", do: true, else: false))
          |> assign(new_checklist_name: "")
          |> assign(new_checkbox_name: "")
          |> assign(edit_checkbox_name: "")
          |> assign(label_check: false)
          |> assign(activity_details: false)
          |> allow_upload(:board_photo, accept: ~w(.jpg .jpeg .png), max_entries: 1, max_file_size: 10_000_000)
          |> allow_upload(:edit_board_photo, accept: ~w(.jpg .jpeg .png), max_entries: 1, max_file_size: 10_000_000)
          |> allow_upload(:attachment, accept: :any, max_entries: 1)

        if socket.assigns.current_user.email in socket.assigns.current_board.owners or socket.assigns.current_user.email in socket.assigns.current_board.members do
          {:ok, socket
                |> assign(:page_title, socket.assigns.current_board.name)                                                     # (2)
                |> assign(static_changed?: static_changed?(socket))}                                                          # (3)
        else
          {:ok, redirect(socket, to: "/boards")}
        end
    end
  end

  def handle_params(params, _url, socket) do
    {:noreply, assign(socket, :params, params)}
  end

  def render(assigns) do
    ~H"""
    <style>
      body:has(.board) { background-image: url("/uploads/<%= @current_board.bg_image %>"); background-position: center;
        & header { height: 3rem !important; }
        & .main-page-section { margin-top: 3rem !important; }
        & footer { display: none; }
      }
      .main.page.board { height: calc(100vh - 3rem);
        & aside{ min-height: calc(100vh - 3rem); flex: 1 0 0; overflow-y: auto; color: white; border-right: 0.0625rem solid white; background-color: rgba(38,8,8,0.9); transition: flex 0.5s, transform 0.5s; height: inherit;
          &.collapsed { flex: 0.1 0 0; overflow-y: hidden; transition: flex 0.5s, transform 0.5s;
            & * { opacity: 0; transition: opacity 0.33s; }
            & .arrow .arrow-icon { transform: rotate(180deg); }
          }
          * { transition: opacity 0.33s 0.15s; }
          & .arrow { right: 0.5rem; top: 0.5rem; opacity: 1;
            & .arrow-icon { opacity: 1; transform: rotate(0deg); }
          }
          & .sidebar-header { overflow-wrap: anywhere; max-width: 90%;}
          & hr { color: white; border: 0.0625rem solid white; width:100%; margin: 1rem 0; }
          & .sidebar-section-container { padding: 0 0.5rem;
            & button { border: none; padding: 0.25rem; border-radius: 1rem;
              &:hover { background-color: darkgray; }
            }
            & .sidebar-section-heading .add-member-container { background-color: rgb(237, 237, 237); top: 0; right: 0; padding: 0.5rem; border-radius: 1rem; color: black;
              & .button-container { top: 1.25rem; right: 1rem;
                & button { border: none; border-radius: 0.5rem;
                  &:hover { background-color: darkgray; }
                  & span { height: 1.25rem; width: 1.25rem; }
                }
              }
              & form { gap: 0.5rem;
                & button { padding: 0.5rem; background-color: green;
                  &:hover { opacity: 0.8; }
                  &[disabled] { background-color: darkgray; }
                }
                & .cancel { background-color: white; border: 0.0625rem solid black; color: black;
                  &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid black; }
                }
              }
            }
            & .sidebar-section-list {
              & .sidebar-section-list-item-container { padding: 0.5rem 0 0.5rem 1rem;
                &:has(a) { padding: 0.5rem 1rem; }
                &:has(a):hover { background-color: darkgray; border-radius: 5rem; }
                a { overflow-wrap: anywhere; }
              }
              & .edit-member-container, & .edit-owner-container { color: black;
                & h4 { color: white; overflow-wrap: anywhere; }
                & button { padding: 0.75rem; margin-top: 0.5rem; }
              }
              & .confirm-member-remove, & .confirm-owner-remove { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; color: black; padding: 0.5rem;
                & button { padding: 0.5rem; }
              }
            }
          }
        }
        & .main-content { min-height: calc(100vh - 3rem); flex: 4; overflow-x: auto; min-width: 80vw; display: flex; flex-wrap: nowrap; gap: 1rem; padding: 0 1rem; align-self: flex-start;
          & .add-list-container { background-color: rgba(200, 200, 200, 0.3); min-width: 20rem; flex: 0 0 20rem; border-radius: 1rem; padding: 0.5rem 1rem; margin-left: 0; white-space: normal; color: white;
            & button { border: none; }
            &:hover { background-color: rgba(200, 200, 200, 0.2) }
            &.active { background-color: rgb(237, 237, 237); color: black; }
            & .buttons-container { margin-top: 1rem;
              & button { border-radius: 1rem;
                &:hover { background-color: darkgray; }
              }
              & .create-list { background-color: rgba(0,0,255,0.5); padding: 0.5rem 1rem; color: white;
                &:hover { background-color: rgba(0,0,255,0.8); }
              }
            }
          }
          & .board-list { background-color: rgb(237, 237, 237); min-width: 20rem; flex: 0 0 20rem; border-radius: 1rem; padding: 0.5rem 1rem; margin-left: 0; white-space: normal;
            & .heading { display: flex !important; cursor: default;
              & h4 {     max-width: 80%; overflow-wrap: anywhere; }
              & .settings { padding: 0.5rem; border-radius: 50%; border: none;
                &:hover{ background-color: darkgray; }
              }
              & .settings-popup { top: 2rem; right: -5rem; border-radius: 1rem; background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid darkgray;
                & .button-container { top: 0.75rem; right: 0.25rem;
                  & button { border-radius: 0.5rem; border: none; padding: 0.25rem;
                    &:hover { background-color: lightgray; }
                  }
                }
                & .list-actions { padding: 0.5rem 0;
                  & button { border: none; padding: 0.5rem;
                    &:hover { background-color: lightgray; }
                    &[disabled] { color: lightgray;
                      &:hover { background-color: transparent; }
                    }
                  }
                  & .rename-list-container { margin-bottom: 0.5rem; padding: 0 0.25rem; }
                  & .delete-list-button { background-color: rgba(250,50,50,0.8);
                    &:hover{ background-color: rgba(250,50,50,1); }
                  }
                  & .delete-list { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 7rem; padding: 0.5rem;
                    & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8); color: black;
                      &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
                    }
                  }
                }
                &.hidden { display: none; }
              }
            }
            & .board-cards-container { overflow-y: auto; max-height: 75vh; min-height: 3rem;
              & .placeholder-card { background-color: lightgray; margin: 0.5rem 0; height: 2.5rem; border-radius: 0.5rem; }
              & .board-card { background-color: white; margin: 0.5rem 0; border-radius: 0.5rem; padding: 0.5rem; text-align: left; box-shadow: 0.1rem 0.2rem 0.2rem lightgray; border: 0.0625rem solid lightgray;
                &:hover { border: 0.0625rem solid blue; }
                &.dragged { transition: 0.01s; transform: translateX(-600rem); opacity: 0.5; }
                & .label-item { height: 0.5rem; width: 3rem; border-radius: 1rem; margin: 0.25rem 0.25rem 0.25rem 0; padding: 0; transition: all 1s ease;
                  &.labels-visible { width: auto; height: auto; padding: 0 0.75rem; min-height: 1rem; min-width: 5rem; transition: all 0.3s ease; }
                }
                & .due-date span { padding: 0.25rem 0.75rem; border-radius: 2rem; margin-top: 0.25rem; }
              }
              & .add-card-input { background-color: white; padding: 0.5rem 0; border-radius: 0.5rem; text-align: left; padding: 0.5rem;
                &.hidden { display: none; }
              }
            }
            & .board-add-card { margin-top: 1rem;
              & button { padding: 0.5rem; border-radius: 1rem; border: none;
                &:hover { background-color: darkgray; }
              }
              & .add-card { cursor: text;
                & .buttons-container {
                  & .create-card { background-color: rgba(0,0,255,0.5); padding: 0.5rem 1rem; color: white;
                    &:hover { background-color: rgba(0,0,255,0.8); }
                  }
                }
              }
            }
          }
        }
      }
      .board-card-detailed { width: 100vw; min-height: 100vh; top: 0; left: 0; backdrop-filter: brightness(0.3); overflow-y: auto;
        & .board-card-detailed-modal { width: 50%; height: auto; min-height: 90%; background-color: white; border: 0.125rem solid black; top: 3rem; border-radius: 1rem; padding: 1rem;
          & .button-container { top: 1.5rem; right: 1.25rem;
            & button { border: none; border-radius: 0.5rem;
              &:hover { background-color: darkgray; }
              & span { height: 1.25rem; width: 1.25rem; }
            }
          }
          & .title-container { padding-bottom: 1.5rem;
            & .card-title-edit { width: calc(85% + 1rem); font-size: 1.5rem; font-weight: bold; line-height: 1.5; margin: 0; border: 0.0625rem solid transparent; padding: 0 0.5rem; border-radius: 0.5rem;
              &.empty { background-color: rgba(192,192,192,0.5);
                &:hover { background-color: rgba(192,192,192,0.8) }
                &:before { content: "Add a title for the card..." }
              }
              &:focus:before { display: none; }
            }
          }
          & .hidden{ display: none; }
          & .detailed-container { margin-bottom: 1rem;
            & .icon { padding: 1rem; width: 2rem; }
            & .circle-letter { width: 2rem; height: 2rem; background-color: rgb(0,0,102); border-radius: 50%; color: white; border: 0.0625rem solid black; margin: 0.5rem 0.5rem 0 0; }
            & p { padding-left: 2.8rem; margin-right: 1rem; padding-right: 1rem;
              &:has(.card-description-edit) { padding-left: 2.3rem; padding-right: 0.5rem; }
              & .card-description-edit { padding: 0.25rem 0.5rem; margin-top: -0.25rem; border-radius: 0.5rem; width: 100%;
                &:hover { background-color: rgba(192,192,192,0.5); }
                &.empty { background-color: rgba(192,192,192,0.5); min-height: 10rem;
                  &:hover { background-color: rgba(192,192,192,0.8) }
                  &:before { content: "Add a more detailed decription..." }
                }
                &:focus:before { display: none; }
              }
            }
            & .show-details-button { top: 0; right: 1.5rem; margin: 0.5rem 0; border: none; color: black; background-color: rgba(192,192,192,0.5);  border-radius: .5rem; padding: .5rem 1rem;
                &:hover{ background-color: rgba(192,192,192,0.8); }
            }
            & .activity-container { display: flex !important; }
            & .links, & .files { padding-left: 2.8rem;
              & .link-buttons-container, & .file-buttons-container { position: absolute; right: 0.5rem;
                & .delete-link-button, & .edit-link-button { border: none; padding: 0.25rem 0.5rem; border-radius: 0.5rem;
                  &:hover { background-color: rgb(220,220,220); }
                }
                & .delete-file-button, & .edit-file-button { border: none; padding: 0.25rem 0.5rem; border-radius: 0.5rem;
                  &:hover { background-color: rgb(200,200,200); }
                }
              }
              & .delete-link, & .delete-file { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; right: 0; padding: 0.5rem; max-width: 15rem;
                & button { background-color: rgba(250,50,50,0.8); border-radius: 0.5rem;
                  &:hover{ background-color: rgba(250,50,50,1); }
                }
                & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8);
                  &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
                }
              }
              & .edit-link, & .edit-file { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; right: 0; padding: 0.5rem; max-width: 15rem;
                & button { margin-top: 0.5rem; }
              }
            }
            & .links { margin: 0.5rem 0; margin-right: 1rem;
              & .link { background-color: white; border: 1px solid lightgray; border-radius: 0.5rem; padding: 0.5rem; box-shadow: 0.125rem 0.125rem 0.125rem 0 lightgray; margin: 0.25rem 0;
                &:hover { background-color: rgb(240,240,240); }
              }
            }
            & .files { margin-right: 1rem;
              & .file { margin: 0.25rem 0;
                & .file-format { padding: 0.5rem 1rem; border: 1px solid lightgray; margin-right: 0.5rem; border-radius: 0.5rem; background-color: lightgray; }
                &:hover { background-color: rgb(240,240,240); }
              }
            }
            & .checklist-title { width: calc(100% - 3rem);
              & span { max-width: 90%; }
              & .delete-checklist-button {border: none; padding: 0.25rem 0.75rem; border-radius: 0.5rem; width: 10%;
                  &:hover { background-color: rgb(240,240,240); }
              }
            }
            & .delete-checklist { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; right: 0; padding: 0.5rem; max-width: 20rem;
              & button { background-color: rgba(250,50,50,0.8); border-radius: 0.5rem;
                &:hover{ background-color: rgba(250,50,50,1); }
              }
              & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8);
                &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
              }
            }
            & .checklist-progress-bar { padding-left: 2.8rem;  margin-right: 1rem;
              & .progress-percentage { width: 10%; }
              & .progress-bar { width: 90%; background-color: lightgray; height: 0.25rem;
                & .completed { background-color: blue; height: 0.25rem; transition: width 0.33s; }
              }
            }
            & .checkboxes { padding-left: 2.8rem; margin-top: 0.5rem;  margin-right: 1rem;
              & .checkbox { margin: 0.25rem 0;
                & form { width: 80%; }
                & .checkbox-buttons { width: 20%;
                  & .edit, & .delete { border: none; padding: 0.25rem 0.75rem; border-radius: 0.5rem;
                    &:hover { background-color: rgb(240,240,240); }
                  }
                  & .delete-checkbox { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; padding: 0.5rem; min-width: 20rem;
                    & button { background-color: rgba(250,50,50,0.8); border-radius: 0.5rem;
                      &:hover{ background-color: rgba(250,50,50,1); }
                    }
                    & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8);
                      &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
                    }
                  }
                }
                & .edit-item-form { gap: 0.5rem; }
              }
              & .add-item { margin: 0.5rem 0; border: none; color: black; background-color: rgba(192,192,192,0.5);  border-radius: .5rem; padding: .5rem 1rem;
                &:hover{ background-color: rgba(192,192,192,0.8); }
              }
              .new-item-form { flex-direction: column; gap: 0.25rem;
                button[disabled] { background-color: gray; }
              }
            }
            & .members { padding-left: 2.8rem; }
            & .due-date { padding-left: 2.8rem;
              & span { padding: 0.5rem 1rem 0.5rem 0.25rem; border-radius: 2rem; display: inline-flex; }
            }
            & .labels-list { padding-left: 2.8rem; margin-right: 1rem;
              & .label-item { padding: 0.5rem 1rem; margin: 0.25rem; border-radius: 0.5rem; }
              & button { border: none; background-color: rgba(192,192,192,0.5); border-radius: .5rem; padding: .5rem 1rem;
                &:hover{ background-color: rgba(192,192,192,0.8); }
              }
              & .edit-label { padding: 0 0 0.5rem 0;
                & .inputs { width: 80%; }
                & button { width: 20%; margin: 0; }
              }
            }
            & .activity-item { margin: 0.5rem 0;
              & .heading {
                & .edit-buttons-container { margin-right: 1.25rem;
                  & .edit, & .delete { border: none; padding: 0.25rem 0.75rem; border-radius: 0.5rem;
                    &:hover { background-color: rgb(240,240,240); }
                  }
                  & .delete-comment { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; padding: 0.5rem; min-width: 20rem;
                    & button { background-color: rgba(250,50,50,0.8); border-radius: 1rem;
                      &:hover{ background-color: rgba(250,50,50,1); }
                    }
                    & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8);
                      &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
                    }
                  }
                }
                & .datetime { color: gray; }
                & .add-comment-button { border: none; border-radius: 0.75rem; box-shadow: 0.1rem 0.1rem 0.1rem 0.15rem lightgray; width: calc(100% - 4rem); color: gray;
                  &:hover { background-color: rgb(245,245,245); }
                }
              }
              & form { width: calc(100% - 4rem); gap: 0.5rem;
                &:has(.comment-edit) { width: calc(100% - 1rem); }
                & .comment-input, & .comment-edit { border-radius: 0.75rem; box-shadow: 0.1rem 0.1rem 0.1rem 0.15rem lightgray; border: none; }
                & .comment-edit { padding: 0.5rem 0.75rem; }
                & button[disabled] { background-color: gray; }
                & .cancel { background-color: white; color: black;
                  &:hover { background-color: rgb(245,245,245); }
                }
              }
              &:has(.add-comment-button) { align-items: baseline; }
              & .card-info { margin-left: 2.5rem; margin-right: 0.5rem;
                p { padding: 0; text-align: left;
                  &.comment { padding: 0.5rem 0.75rem; border-radius: 0.75rem; box-shadow: 0.1rem 0.1rem 0.1rem 0.15rem lightgray; }
                }
              }
            }
          }
          & .main-detailed-container {
            & .main-content { flex: 3; }
            & .main-sidebar { flex: 1;
              & .sidebar-menu {
                & button { border: none; background-color: rgba(192,192,192,0.5); border-radius: .5rem; padding: .5rem 1rem; margin-bottom: .5rem;
                  & .button-name{ width: 80%; padding: 0 0.25rem; white-space: normal; text-align: left; }
                  &:hover{ background-color: rgba(192,192,192,0.8); }
                }
                & .add-card-member-container { width: 20rem; background-color: rgb(237, 237, 237); top: 0; right: 0; padding: 0.5rem; border-radius: 1rem; color: black; max-height: 30rem; overflow: auto;
                  & h4 { padding-top: 2.5rem; }
                  & > h4 ~ h4 { padding-top: 0; }
                  & .button-container { top: 1rem; right: 0.5rem;
                    & button { border: none; border-radius: 0.5rem;
                      &:hover { background-color: darkgray; }
                      & span { height: 1.25rem; width: 1.25rem; }
                    }
                  }
                  & form { gap: 0.5rem;
                    & button { padding: 0.5rem; background-color: green;
                      &:hover { opacity: 0.8; }
                      &[disabled] { background-color: darkgray; }
                    }
                    & .cancel { background-color: white; border: 0.0625rem solid black; color: black;
                      &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid black; }
                    }
                  }
                  & .current-member { padding-left: 0.5rem;
                    & h5 { width: 78%; word-break: break-all; text-align: left; }
                    & button { margin: 0; background-color: transparent; margin-right: -0.25rem;
                      &:hover { background-color: rgba(192,192,192,0.5); }
                    }
                  }
                }
                & .add-checkbox-container { width: 20rem; background-color: rgb(237, 237, 237); top: 0; right: 0; padding: 0.5rem; border-radius: 1rem; color: black; max-height: 30rem; overflow: auto;
                  & h4{ padding-top: 2.5rem; }
                  & .button-container { top: 1rem; right: 0.5rem;
                    & button { border: none; border-radius: 0.5rem;
                      &:hover { background-color: darkgray; }
                      & span { height: 1.25rem; width: 1.25rem; }
                    }
                  }
                  & form { gap: 0.5rem;
                    & button { padding: 0.5rem; background-color: green;
                      &:hover { opacity: 0.8; }
                      &[disabled] { background-color: darkgray; }
                    }
                    & .cancel { background-color: white; border: 0.0625rem solid black; color: black;
                      &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid black; }
                    }
                  }
                }
                & .add-labels { width: 20rem; background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; max-height: 25rem; overflow: auto; padding: 0 0.25rem;
                  & .labels-default-list { padding-top: 0.25rem;
                    & .label-item { padding: 0.5rem 1rem; margin: 0.25rem; border-radius: 0.5rem;
                      & .active { right: 1rem; }
                    }
                  }
                  & .labels-list { padding: 0 2.5rem 0.25rem 0;
                    & .label-item { padding: 0.5rem 1rem; margin: 0.25rem; border-radius: 0.5rem;
                      & .active { right: 3.5rem; }
                      & .edit, & .edit-complete { right: 0.33rem; margin: 0; padding: 0.33rem; border-radius: 50%; }
                      &.editing { padding: 0; background-color: transparent !important; }
                      & .delete-label-button { width: 20%; margin: 0; padding: 0.5rem; }
                      & .delete-label { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; padding: 0.5rem; right: -2rem;
                        & button { background-color: rgba(250,50,50,0.8);
                          &:hover{ background-color: rgba(250,50,50,1); }
                        }
                        & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8);
                          &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
                        }
                      }
                    }
                    & .add-label-item { padding: 0.5rem 1rem; margin: 0.25rem; border-radius: 0.5rem; }
                  }
                  & .new-label { padding: 0 0 0.5rem 0;
                    & .inputs { width: 80%; }
                    & button { width: 20%; margin: 0; }
                  }
                  & hr { margin: 0.25rem 0; }
                  &.hidden { display: none; }
                }
                & .add-attachment { width: 25rem; background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; max-height: 30rem; overflow: auto; padding: 0 0.25rem;
                  & h4 { padding-top: 2.5rem; }
                  & .button-container { top: 0.5rem; right: 0.5rem; }
                  & .hint { padding: 0.25rem; border: 0.0625rem dotted black; text-align: center;
                    & .drop{ padding-top: 0.25rem; }
                    & input { width: 100%; text-align-last: center; }
                  }
                  & .attachment-type-select .active { background-color: rgb(200,200,200); }
                  & .upload-button { margin-top: 0.5rem; background-color: black;
                    &:hover { background-color: rgb(50,50,50); }
                  }
                }
                & .add-due-date { width: 20rem; background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 10rem; max-height: 30rem; overflow: auto; padding: 0 0.25rem;
                  & .flatpickr-calendar { width: 100% !important;
                    & .flatpickr-innerContainer * { width: 100% !important; }
                  }
                  & .buttons-container { margin-top: 1rem;
                    & button { width: auto; }
                  }
                }
                &.delete-card-container{
                  & button { background-color: rgba(250,50,50,0.8);
                    &:hover{ background-color: rgba(250,50,50,1); }
                  }
                  & .delete-card { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; top: 2.5rem; padding: 0.5rem; min-width: 20rem;
                    & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8);
                      &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .create-new-board, .edit-board { width: 100vw; min-height: 100vh; top: 0; left: 0; backdrop-filter: brightness(0.3); overflow-y: auto;
        & .create-new-board-modal, & .edit-board-modal { width: 50%; height: auto; min-height: 50%; background-color: white; border: 0.125rem solid black; top: 5rem; border-radius: 1rem; padding: 1rem;
          & .button-container { top: 1.5rem; right: 1.25rem;
            & button { border: none; border-radius: 0.5rem;
              &:hover { background-color: darkgray; }
              & span { height: 1.25rem; width: 1.25rem; }
            }
          }
          & form { gap: 1rem;
            .hint { padding: 2rem; border: 0.0625rem dotted black; text-align: center;
              & .drop{ padding-top: 2rem; }
            }
          }
          & .delete-board-button { bottom: 1rem; right: 1rem; background-color: rgba(250,50,50,0.8);
            &:hover { background-color: rgba(250,50,50,1); }
          }
          & .delete-board { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; bottom: 1rem; padding: 0.5rem;
            & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8); color: black;
              &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
            }
          }
        }
      }
    </style>
    <div class="main page board width100 content-start layer1 relative">
      <aside class="sidebar content-start relative" id="sidebar">
        <div class="arrow pointer layer1" phx-click={JS.toggle_class("collapsed", to: ".sidebar")}> <.icon name="hero-arrow-left-circle" class="arrow-icon"/> </div>
        <div class="sidebar-header width100 pointer" phx-click={if @current_user.email in @current_board.owners, do: JS.remove_class("hidden", to: "#edit-board")}> <h3> {if @current_board.name == "", do: "Unnamed Board", else: @current_board.name} </h3> </div>
        <div class="show-cards-toggle">
          <.input name="show-cards-toggle" id="show-cards-toggle" value={@cards_toggle} phx-click="toggle_cards_visibility" type="checkbox" label={gettext("Show only cards assigned to me")} style={%{main: "margin-top: 1rem;", inner: "", label: "color: white; flex-wrap: nowrap; padding: 0.5rem; text-align: left; cursor: pointer;"}} phx-hook="CardsVisibilityHook"/>
        </div>
        <hr>
        <div class="sidebar-section-container width100">
          <div class="sidebar-section-heading width100 space-between relative">
            <h4><.icon name="hero-users" />&nbsp; {gettext("Members")}:</h4>
            <button phx-click={JS.remove_class("hidden", to: ".add-member-container")} :if={@current_user.email in @current_board.owners}> <.icon name="hero-plus" /> </button>
            <div class="add-member-container layer3 content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".add-member-container")}>
              <div class="button-container layer3 flex-end absolute">
                <button phx-click={JS.add_class("hidden", to: ".add-member-container")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
              </div>
              <h4>{gettext("Add Members")}:</h4>
              <form phx-change="validate_new_member_in_board" phx-submit="add_board_member">
                <.input type="select" prompt={gettext("Select a member to add...")} name="member" options={Enum.filter(Enum.map(@users,fn user -> user.email end), fn user -> user not in @current_board.members and user not in @current_board.owners end)} value="" style={%{ main: "width: 100%;", inner: "", label: ""}}  />
                <.input type="select" prompt={gettext("Select a member role...")} name="role" options={["Member", "Owner"]} value={@new_board_member_role} style={%{ main: "width: 100%;", inner: "margin: 0;", label: ""}}  />
                <.button type="submit" disabled={@new_board_member_email in [nil, ""] or @new_board_member_role in [nil, ""]} class="add-new-member-button" phx-click={JS.add_class("hidden", to: ".add-member-container")}>{gettext("Add Member to board")}</.button>
                <.button type="button" class="cancel" phx-click={JS.add_class("hidden", to: ".add-member-container")}>{gettext("Cancel")}</.button>
              </form>
            </div>
          </div>
          <div class="sidebar-section-list width100">
            <div class={"sidebar-section-list-item-container width100 space-between #{if @current_user.email in @current_board.owners, do: "pointer"}"} :for={{owner, index} <- Enum.with_index(@current_board.owners,1)} phx-click={if @current_user.email in @current_board.owners, do: JS.remove_class("hidden", to: ".edit-owner-container-#{index}")}>
              <p class="sidebar-section-list-item flex-start"><.icon name="hero-star-solid" style="color: yellow;"/>&nbsp; {List.first(String.split(owner, "@"))} {if @current_user.email == owner, do: gettext("(You)")}</p>
              <button phx-click={JS.remove_class("hidden", to: ".confirm-owner-remove-#{index}")} :if={@current_user.email in @current_board.owners and length(@current_board.owners) > 1}> <.icon name="hero-minus" /> </button>
              <div class={"confirm-owner-remove confirm-owner-remove-#{index} layer3 content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".confirm-owner-remove-#{index}")}>
                <h4 class="width100">{gettext("Are you sure?")}</h4>
                <.button class="confirm-owner-remove-button" phx-click={JS.add_class("hidden", to: ".confirm-owner-remove-#{index}") |> JS.add_class("hidden", to: "#edit-board") |> JS.push("remove_board_owner")} phx-value-owner={owner}>{if owner != @current_user.email, do: gettext("Yes, remove owner"), else: gettext("Yes, leave board")}</.button>
                <.button class="cancel" phx-click={JS.add_class("hidden", to: ".confirm-owner-remove-#{index}")}>{gettext("Cancel")}</.button>
              </div>
              <form phx-change="validate" phx-submit="edit_board_member" phx-value-member={owner} class={"edit-owner-container space-evenly edit-owner-container-#{index} hidden"} phx-click-away={JS.add_class("hidden", to: ".edit-owner-container-#{index}")}>
                <h4>{owner}</h4>
                <.input type="select" name="role" options={if length(@current_board.owners) > 1, do: ["Member", "Owner"], else: ["Owner"]} value="Owner" style={%{ main: "width: 100%;", inner: "margin: 0;", label: ""}}  />
                <.button type="submit" phx-click={JS.add_class("hidden", to: ".edit-owner-container-#{index}")}>{gettext("Edit Member role")}</.button>
                <.button type="button" class="cancel" phx-click={JS.add_class("hidden", to: ".edit-owner-container-#{index}")}>{gettext("Cancel")}</.button>
              </form>
            </div>
            <div class={"sidebar-section-list-item-container width100 space-between #{if @current_user.email in @current_board.owners, do: "pointer"}"} :for={{member, index} <- Enum.with_index(@current_board.members,1)} phx-click={if @current_user.email in @current_board.owners, do: JS.remove_class("hidden", to: ".edit-member-container-#{index}")}>
              <p class="sidebar-section-list-item flex-start">{List.first(String.split(member, "@"))} {if @current_user.email == member, do: gettext("(You)")}</p>
              <button phx-click={JS.remove_class("hidden", to: ".confirm-member-remove-#{index}")} :if={@current_user.email in @current_board.owners or @current_user.email == member}> <.icon name="hero-minus" /> </button>
              <div class={"confirm-member-remove confirm-member-remove-#{index} layer3 content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".confirm-member-remove-#{index}")}>
                <h4 class="width100">{gettext("Are you sure?")}</h4>
                <.button class="confirm-member-remove-button" phx-click={JS.add_class("hidden", to: ".confirm-member-remove-#{index}") |> JS.add_class("hidden", to: "#edit-board") |> JS.push("remove_board_member")} phx-value-member={member}>{if member != @current_user.email, do: gettext("Yes, remove member"), else: gettext("Yes, leave board")}</.button>
                <.button class="cancel" phx-click={JS.add_class("hidden", to: ".confirm-member-remove-#{index}")}>{gettext("Cancel")}</.button>
              </div>
              <form phx-change="validate" phx-submit="edit_board_member" phx-value-member={member} class={"edit-member-container space-evenly edit-member-container-#{index} hidden"} phx-click-away={JS.add_class("hidden", to: ".edit-member-container-#{index}")}>
                <h4>{member}</h4>
                <.input type="select" name="role" options={["Member", "Owner"]} value="Member" style={%{ main: "width: 100%;", inner: "margin: 0;", label: ""}}  />
                <.button type="submit" phx-click={JS.add_class("hidden", to: ".edit-member-container-#{index}")}>{gettext("Edit Member role")}</.button>
                <.button type="button" class="cancel" phx-click={JS.add_class("hidden", to: ".edit-member-container-#{index}")}>{gettext("Cancel")}</.button>
              </form>
            </div>
          </div>
        </div>
        <hr>
        <div class="sidebar-section-container width100">
          <div class="sidebar-section-heading width100 space-between">
            <h4><.icon name="hero-clipboard-document-list" />&nbsp; {gettext("Your Boards")}:</h4>
            <button phx-click={JS.remove_class("hidden", to: "#create-new-board")} onclick="document.querySelector('#new_board_name').value = ''"> <.icon name="hero-plus" /> </button>
          </div>
          <div class="sidebar-section-list width100">
            <div class="sidebar-section-list-item-container width100 space-between justify" :for={board <- @boards}>
              <%# The link below is using href on purpose as we need to refresh the session when we navigate to a different board so that the cards visibility
              cookie will take effect. %>
              <.link href={~p"/boards/#{board.id}/#{String.replace(board.name, " ", "-")}"} class="width100 flex-start"> {if board.name == "", do: "Unnamed Board", else: board.name} </.link>
            </div>
          </div>
        </div>
      </aside>
      <div class="main-content relative items-start flex-start" id="trello-content" phx-hook="DragAndDrop">
        <div class={"board-list #{if @cards_toggle and Enum.count(list.cards, fn card -> @current_user.email in card.members end) == 0 and length(list.cards) > 0, do: "hidden"}"} :for={{list, index} <- Enum.with_index(@lists,1)} data-list-id={list.id}>
          <div class="heading space-between items-start width100 relative layer3">
            <h4>{if list.name == "", do: "Unnamed List", else: list.name}</h4>
            <button class="settings pointer" phx-click={JS.remove_class("hidden", to: ".settings-popup-#{index}")}> <.icon name="hero-ellipsis-horizontal"/> </button>
            <div class={"settings-popup settings-popup-#{index} absolute hidden width100"} phx-click-away={JS.add_class("hidden", to: ".settings-popup-#{index}")}>
              <h4>{gettext("List Actions")}</h4>
              <div class="button-container layer3 flex-end absolute">
                <button type="button" aria-label={gettext("close")} phx-click={JS.add_class("hidden", to: ".settings-popup-#{index}")}> <.icon name="hero-x-mark-solid" /> </button>
              </div>
              <div class="list-actions width100 relative">
                <button class="width100 space-between" phx-click={JS.remove_class("hidden", to: ".rename-list-container")}>{gettext("Rename List")} <.icon name="hero-pencil"/></button>
                <div class="rename-list-container width100 hidden" phx-click-away={JS.add_class("hidden", to: ".rename-list-container")}>
                  <.input name="rename-list" value={list.name} phx-keyup="update_list_name" phx-value-list_id={list.id} phx-debounce="300" style={%{main: "width: 100%", label: "", inner: ""}}/>
                </div>
                <button class="width100 space-between" disabled={index==1} phx-click={JS.add_class("hidden", to: ".settings-popup-#{index}") |> JS.push("move_list")} phx-value-list_id={list.id} phx-value-direction="left">{gettext("Move left")} &nbsp;<.icon name="hero-arrow-small-left"/></button>
                <button class="width100 space-between" disabled={index==length(@lists)} phx-click={JS.add_class("hidden", to: ".settings-popup-#{index}") |> JS.push("move_list")} phx-value-list_id={list.id} phx-value-direction="right">{gettext("Move right")} &nbsp;<.icon name="hero-arrow-small-right"/></button>
                <button class={"add-card-button add-card-button-#{String.replace(list.name, " ", "_")} width100 space-between"} phx-click={JS.add_class("hidden", to: ".settings-popup-#{index}") |> JS.add_class("hidden", to: ".add-card") |> JS.remove_class("hidden", to: ".add-card-#{String.replace(list.name, " ", "_")}") |> JS.add_class("hidden", to: ".add-card-button-#{String.replace(list.name, " ", "_")}") |> JS.remove_class("hidden", to: ".add-card-input-#{index}")}>{gettext("Add a card")} &nbsp;<.icon name="hero-plus" /></button>
                <button class="width100 bold space-between delete-list-button" phx-click={JS.remove_class("hidden", to: ".delete-list")} :if={@current_user.email in @current_board.owners}>{gettext("Delete list")} &nbsp;<.icon name="hero-trash"/></button>
                <div class="delete-list layer3 absolute content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".delete-list")}>
                  <h4>{gettext("Are you sure?")}</h4>
                  <.button class="delete-list-button" phx-value-list_id={list.id} phx-click={JS.add_class("hidden", to: ".delete-list") |> JS.add_class("hidden", to: ".settings-popup-#{index}") |> JS.push("delete_list")}>{gettext("Yes, delete list")}</.button>
                  <.button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-list")}>{gettext("Cancel")}</.button>
                </div>
              </div>
            </div>
          </div>
          <div class="board-cards-container content-baseline width100">
            <div class={"board-card width100 flex-start pointer #{if @cards_toggle and @current_user.email not in card.members, do: "hidden"}"} :for={{card, index} <- Enum.with_index(Enum.sort_by(list.cards, & &1.order), 1)} draggable="true"
                          id={"#{String.replace(list.name, " ", "_")}-#{index}"} phx-click={JS.remove_class("hidden", to: "#board-card-detailed") |> JS.add_class("detailed-card-#{card.id}", to: "#board-card-detailed") |> JS.push("open_card")} phx-value-id={card.id}
                          data-card-description={card.description} data-labels={Jason.encode!(card.labels)} data-card-id={card.id} data-card-name={card.name} data-due-date={card.dueDate} data-completed={card.completed} data-order={card.order} data-list-id={list.id}>
              <%= for label <- Enum.filter(@labels, fn label -> label.id in card.labels end) do %>
                <div class={"label-item #{if @label_text_visible, do: "labels-visible"}"} phx-click="toggle_labels_visibility" style={"background-color: #{label.color};"} title={label.name}>
                  <span :if={@label_text_visible}> {if label.name == "", do: "Unnamed Label", else: label.name} </span>
                </div>
              <% end %>
              <span class="width100"> {if card.name == "" or card.name == "<br>", do: "Unnamed Card", else: card.name} </span>
              <div class="due-date" :if={not card.dueDate in [nil, ""]}>
                <span style={"background-color: #{elem(compare_dates(card.dueDate, card.completed), 0)}"}>
                  {if string_to_date(card.dueDate).year == Date.utc_today().year, do: Calendar.strftime(string_to_date(card.dueDate), "%d %b"), else: Calendar.strftime(string_to_date(card.dueDate), "%d %b %Y")}
                </span>
              </div>
            </div>
            <.input class={"add-card-input add-card-input-#{index} hidden"} placeholder={gettext("Enter a title for the new card...")} style={%{main: "width: 100%;", label: "", inner: ""}} spellcheck="false" phx-keyup="update_new_card_name" phx-debounce="300" value={@new_card_name} name="new-card-name" phx-click-away={JS.add_class("hidden", to: ".add-card") |> JS.remove_class("hidden", to: ".add-card-button") |> JS.add_class("hidden", to: ".add-card-input-#{index}") |> JS.push("cancel_new_card")}/>
          </div>
          <div class="board-add-card width100 pointer">
            <button class={"add-card-button add-card-button-#{String.replace(list.name, " ", "_")} width100"} phx-click={JS.add_class("hidden", to: ".add-card") |> JS.remove_class("hidden", to: ".add-card-#{String.replace(list.name, " ", "_")}") |> JS.add_class("hidden", to: ".add-card-button-#{String.replace(list.name, " ", "_")}") |> JS.remove_class("hidden", to: ".add-card-input-#{index}")}> <.icon name="hero-plus" />&nbsp; {gettext("Add a card")} </button>
            <div class={"add-card add-card-#{String.replace(list.name, " ", "_")} width100 hidden"}>
              <div class="buttons-container space-between">
                <button class="create-card" phx-click={JS.add_class("hidden", to: ".add-card") |> JS.remove_class("hidden", to: ".add-card-button") |> JS.add_class("hidden", to: ".add-card-input-#{index}") |> JS.push("add_new_card") |> JS.dispatch("cards_update", to: "#trello-content")} phx-value-new_card_name={@new_card_name} phx-value-list_id={list.id} >{gettext("Add Card")}</button>
                <button> <.icon name="hero-x-mark-solid" /> </button>
              </div>
            </div>
          </div>
        </div>
        <div class="add-list-container pointer bold">
          <button class="add-list-button width100" phx-click={JS.remove_class("hidden", to: ".add-list") |> JS.add_class("hidden", to: ".add-list-button") |> JS.remove_class("hidden", to: ".add-list-input") |> JS.add_class("active", to: ".add-list-container")}> <.icon name="hero-plus" />&nbsp; {gettext("Add another list")} </button>
          <div class={"add-list width100 hidden"}>
            <.input class={"add-list-input hidden"} placeholder={gettext("Enter a title for the new list...")} style={%{main: "width: 100%;", label: "", inner: ""}} spellcheck="false" phx-keyup="update_new_list_name" phx-debounce="300" value={@new_list_name} name="new-list-name" phx-click-away={JS.add_class("hidden", to: ".add-list") |> JS.remove_class("hidden", to: ".add-list-button") |> JS.add_class("hidden", to: ".add-list-input") |> JS.remove_class("active", to: ".add-list-container") |> JS.push("cancel_new_list")}/>
            <div class="buttons-container space-between">
              <button class="create-list" phx-click={JS.add_class("hidden", to: ".add-list") |> JS.remove_class("hidden", to: ".add-list-button") |> JS.add_class("hidden", to: ".add-list-input") |> JS.remove_class("active", to: ".add-list-container") |> JS.push("add_new_list") |> JS.dispatch("lists_update", to: "#trello-content")} phx-value-new_list_name={@new_list_name} >{gettext("Add List")}</button>
              <button> <.icon name="hero-x-mark-solid" /> </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <.focus_wrap id="board-card-detailed" class="board-card-detailed fixed hidden layer2">
      <div class="board-card-detailed-modal fixed content-start" phx-click-away={JS.add_class("hidden", to: "#board-card-detailed") |> JS.remove_class("detailed-card-#{@selected_card.id}", to: "#board-card-detailed") |> JS.push("close_card")} :if={@selected_card}>
        <div class="button-container layer3 flex-end absolute">
          <button phx-click={JS.add_class("hidden", to: "#board-card-detailed") |> JS.remove_class("detailed-card-#{@selected_card.id}", to: "#board-card-detailed") |> JS.push("close_card")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
        </div>
        <div class="title-container width100 flex-start detailed-container">
          <.icon name="hero-clipboard-document-check" class="icon" />&nbsp;
          <span class={"card-title-edit flex-start justify #{if @selected_card.name == nil or Regex.match?(~r/^\s*$/, @selected_card.name) , do: "empty"}"} role="textbox" spellcheck="false" contenteditable data-card-name={@selected_card.name}>
            {@selected_card.name}
          </span>
          <p>{gettext("in list")} &nbsp;<span class="bold">{@selected_card.list.name}</span></p>
        </div>
        <div class="main-detailed-container items-start width100">
          <div class="main-content">
            <div class="detailed-container width100 flex-start" :if={length(@selected_card.members) > 0}>
              <.icon name="hero-users" class="icon" />
              <h4 class="flex-start justify">{gettext("Members")}: </h4>
              <div class="members width100 flex-start">
                <.tooltip :for={{member, index} <- Enum.with_index(@selected_card.members,1)} data={[%{letter: String.capitalize(String.first(member)), text: member}]} class={"letter-#{index}"} options={%{position: "bottom", arrow_position: "none", color: "white", bg_color: "rgb(85, 85, 85)", box_shadow: "", hover_zoom: "1", cursor: "default"}} style={%{wrapper: "width: 2rem; height: 2rem; background-color: rgb(0,0,102); border-radius: 50%; color: white; border: 0.0625rem solid black; margin: 0 0.5rem 0.5rem 0;", main: "", tooltip: "margin-top: 1.75rem; left: -1rem;"}} />
              </div>
            </div>
            <div class="detailed-container width100 flex-start" :if={not @selected_card.dueDate in ["", nil]}>
              <.icon name="hero-clock" class="icon" />
              <h4 class="flex-start justify">{gettext("Due Date")}: </h4>
              <div class="due-date width100 flex-start">
                <span style={"background-color: #{elem(compare_dates(@selected_card.dueDate, @selected_card.completed), 0)}"}>
                  <.input type="checkbox" value={@selected_card.completed} name="due-date-completion" class="due-date-completion" style={%{main: "padding: 0 0.5rem;", label: "", inner: ""}}/>
                  {Calendar.strftime(string_to_date(@selected_card.dueDate), "%d %b %Y, %H:%M")}
                  {elem(compare_dates(@selected_card.dueDate, @selected_card.completed), 1)}
                </span>
              </div>
            </div>
            <div class="detailed-container width100 flex-start" :if={length(Enum.filter(@labels, fn label -> label.id in @selected_card.labels end)) > 0}>
              <.icon name="hero-tag" class="icon" />
              <h4 class="flex-start justify">{gettext("Labels")} </h4>
              <div class="labels-list width100 flex-start">
                <%= for label <- Enum.filter(@labels, fn label -> label.id in @selected_card.labels end) do %>
                  <div class="label-item pointer" data-label-id={label.id} style={"background-color: #{label.color};"} phx-click={JS.remove_class("hidden", to: ".add-labels")}>
                    {if label.name == "", do: "Unnamed Label", else: label.name}
                  </div>
                <% end %>
                <button phx-click={JS.remove_class("hidden", to: ".add-labels")}> <.icon name="hero-plus" /> </button>
              </div>
            </div>
            <div class="detailed-container width100 flex-start">
              <.icon name="hero-pencil-square" class="icon" />
              <h4 class="flex-start justify">{gettext("Description")} </h4>
              <p class="flex-start justify width100">
                <span class={"card-description-edit flex-start justify #{if @selected_card.description == nil or Regex.match?(~r/^\s*(<br\s*\/?>)?\s*$/, @selected_card.description), do: "empty"}"} role="textbox" spellcheck="false" contenteditable phx-click={JS.add_class("edit", to: ".card-description-edit")} phx-click-away={JS.remove_class("edit", to: ".card-description-edit")} data-card-description={@selected_card.description}>
                  {raw(@selected_card.description)}
                </span>
              </p>
            </div>
            <div class="detailed-container width100 flex-start" :if={@selected_card.attachments != []}>
              <.icon name="hero-paper-clip" class="icon" />
              <h4 class="flex-start justify">{gettext("Attachments")} </h4>
              <div class="links width100 flex-start" :if={Enum.filter(@selected_card.attachments, fn attachment -> attachment.type == "link" end) != []}>
                <h5 class="width100 bold flex-start">{gettext("Links")}</h5>
                <div class="list width100 relative" :for={link <- Enum.filter(@selected_card.attachments, fn attachment -> attachment.type == "link" end)}>
                  <a class="width100 flex-start link" href={if String.starts_with?(String.downcase(link.path), "https://") or String.starts_with?(String.downcase(link.path), "http://"), do: link.path, else: "//#{link.path}"} target="_blank"> {link.display_text} </a>
                  <div class="link-buttons-container">
                    <button class="edit-link-button" aria-label={gettext("Edit link")} phx-click={JS.remove_class("hidden", to: ".edit-link-#{link.attachment_id}")}> <.icon name="hero-pencil"/> </button>
                    <button class="delete-link-button" aria-label={gettext("Delete link")} phx-click={JS.remove_class("hidden", to: ".delete-link-#{link.attachment_id}")}> <.icon name="hero-trash"/> </button>
                  </div>
                  <form class={"edit-link edit-link-#{link.attachment_id} layer3 absolute content-baseline space-evenly width50 hidden"} phx-value-attachment_id={link.attachment_id} phx-change="validate" phx-submit={JS.add_class("hidden", to: ".add-attachment") |> JS.add_class("hidden", to: ".edit-link-#{link.attachment_id}") |> JS.push("edit_link")} phx-click-away={JS.add_class("hidden", to: ".edit-link-#{link.attachment_id}")}>
                    <.input name="link_path" value={link.path} placeholder="Link URL" class="width100"/>
                    <.input name="link_display_name" value={link.display_text} placeholder="Link Display Name" class="width100"/>
                    <.button class="upload-button width50">{gettext("Edit link")}</.button>
                  </form>
                  <div class={"delete-link delete-link-#{link.attachment_id} layer3 absolute content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".delete-link-#{link.attachment_id}")}>
                    <h4>{gettext("Are you sure?")}</h4>
                    <button phx-value-attachment_id={link.attachment_id} phx-click={JS.add_class("hidden", to: ".delete-link-#{link.attachment_id}") |> JS.push("delete_attachment")}>{gettext("Yes, delete link")}</button>
                    <button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-link-#{link.attachment_id}")}>{gettext("Cancel")}</button>
                  </div>
                </div>
              </div>
              <div class="files width100 flex-start" :if={Enum.filter(@selected_card.attachments, fn attachment -> attachment.type == "file" end) != []}>
                <h5 class="width100 bold flex-start">{gettext("Files")}</h5>
                <div class="list width100 relative flex-start" :for={file <- Enum.filter(@selected_card.attachments, fn attachment -> attachment.type == "file" end)}>
                  <div class="file width100 flex-start">
                    <div class="file-format bold"> {String.upcase(List.last(String.split(file.path, ".")))} </div>
                    <.downloadable class={"file-#{file.attachment_id}"} data={%{file_path: "/uploads/#{file.path}", link_text: file.display_text}} options={%{download_icon: 0, file_name: 0, background_image: "", hover_border_color: "rgba(0,0,0,0.3)"}} style={%{main: "max-width: 80%; width: inherit;", link: "width: 100%; justify-content: flex-start;", link_text: "font-weight: bold;", file_name: "", bg_image: "", icon: ""}}/>
                    <div class="file-buttons-container">
                      <button class="edit-file-button" aria-label={gettext("Edit file")} phx-click={JS.remove_class("hidden", to: ".edit-file-#{file.attachment_id}")}> <.icon name="hero-pencil"/> </button>
                      <button class="delete-file-button" aria-label={gettext("Delete file")} phx-click={JS.remove_class("hidden", to: ".delete-file-#{file.attachment_id}")}> <.icon name="hero-trash"/> </button>
                    </div>
                    <form class={"edit-file edit-file-#{file.attachment_id} layer3 absolute content-baseline space-evenly width50 hidden"} phx-value-attachment_id={file.attachment_id} phx-change="validate" phx-submit={JS.add_class("hidden", to: ".add-attachment") |> JS.add_class("hidden", to: ".edit-file-#{file.attachment_id}") |> JS.push("edit_file")} phx-click-away={JS.add_class("hidden", to: ".edit-file-#{file.attachment_id}")}>
                      <.input name="file_display_name" value={file.display_text} placeholder={gettext("File Display Name")} class="width100"/>
                      <.button class="upload-button width50">{gettext("Edit file")}</.button>
                    </form>
                    <div class={"delete-file delete-file-#{file.attachment_id} layer3 absolute content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".delete-file-#{file.attachment_id}")}>
                      <h4>{gettext("Are you sure?")}</h4>
                      <button phx-value-attachment_id={file.attachment_id} phx-click={JS.add_class("hidden", to: ".delete-file-#{file.attachment_id}") |> JS.push("delete_attachment")}>{gettext("Yes, delete file")}</button>
                      <button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-file-#{file.attachment_id}")}>{gettext("Cancel")}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="detailed-container width100 flex-start relative" :for={checklist <- Enum.sort_by(@selected_card.checklists, fn checklist -> checklist.id end)}>
              <.icon name="hero-check-circle" class="icon" />
              <h4 class="space-between justify checklist-title items-start">
                <span class={"checklist-title-edit checklist-title-edit-#{checklist.checklist_id} flex-start justify #{if checklist.name == nil or Regex.match?(~r/^\s*$/, checklist.name), do: "empty"}"} role="textbox" spellcheck="false" contenteditable data-checklist-name={checklist.name} data-checklist-id={checklist.checklist_id}>
                  {checklist.name}
                </span>
                <button class="delete-checklist-button" aria-label={gettext("Delete checklist")} phx-click={JS.remove_class("hidden", to: ".delete-checklist-#{checklist.checklist_id}")}> <.icon name="hero-trash"/> </button>
              </h4>
              <div class={"delete-checklist delete-checklist-#{checklist.checklist_id} layer3 absolute content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".delete-checklist-#{checklist.checklist_id}")}>
                <h4>{gettext("Are you sure?")}</h4>
                <button phx-value-checklist_id={checklist.checklist_id} phx-click={JS.add_class("hidden", to: ".delete-checklist-#{checklist.checklist_id}") |> JS.push("delete_checklist")}>{gettext("Yes, delete checklist")}</button>
                <button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-checklist-#{checklist.checklist_id}")}>{gettext("Cancel")}</button>
              </div>
              <div class="checklist-progress-bar width100">
                <div class="progress-percentage flex-start">
                  {if checklist.checkboxes == [], do: 0, else: Decimal.to_integer(Decimal.new(Float.to_string(Float.round(Enum.count(checklist.checkboxes, fn checkbox -> checkbox.checked == true end) / Enum.count(checklist.checkboxes) * 100))))}%
                </div>
                <div class="progress-bar flex-start">
                  <div class="completed" style={"width: #{if checklist.checkboxes == [], do: 0, else: Enum.count(checklist.checkboxes, fn checkbox -> checkbox.checked == true end) / Enum.count(checklist.checkboxes) * 100}%; #{if checklist.checkboxes != [], do: (if Enum.count(checklist.checkboxes, fn checkbox -> checkbox.checked == true end) / Enum.count(checklist.checkboxes) == 1, do: "background-color: green;")}"}></div>
                </div>
              </div>
              <div class="checkboxes width100 flex-start">
                <div class="checkbox width100 flex-start items-start" :for={checkbox <- checklist.checkboxes}>
                  <form phx-change="checkboxes_update" phx-value-checklist_id={checklist.checklist_id} class="flex-start">
                    <.input type="checkbox" value={checkbox.checked} name={"checkbox_#{checklist.checklist_id}_#{checkbox.checkbox_id}"} label={checkbox.name} style={%{main: "", inner: "", label: "font-size: 1rem; flex-wrap: nowrap; text-align: left; cursor: pointer;"}}/>
                  </form>
                  <div class="checkbox-buttons relative">
                    <button class="edit" aria-label={gettext("Edit checkbox")} phx-click={JS.push("assign_edit_checkbox_name") |> JS.remove_class("hidden", to: ".edit-item-form-#{checklist.checklist_id}-#{checkbox.checkbox_id}")} phx-value-checkbox_name={checkbox.name}> <.icon name="hero-pencil"/> </button>
                    <button class="delete" aria-label={gettext("Delete checkbox")} phx-click={JS.remove_class("hidden", to: ".delete-checkbox-#{checklist.checklist_id}-#{checkbox.checkbox_id}")}> <.icon name="hero-trash"/> </button>
                    <div class={"delete-checkbox delete-checkbox-#{checklist.checklist_id}-#{checkbox.checkbox_id} layer3 absolute content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".delete-checkbox-#{checklist.checklist_id}-#{checkbox.checkbox_id}")}>
                      <h4>{gettext("Are you sure?")}</h4>
                      <button phx-value-checkbox_id={checkbox.checkbox_id} phx-value-checklist_id={checklist.checklist_id} phx-click={JS.add_class("hidden", to: ".delete-checkbox-#{checklist.checklist_id}-#{checkbox.checkbox_id}") |> JS.push("delete_checkbox")}>{gettext("Yes, delete checkbox")}</button>
                      <button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-checkbox-#{checklist.checklist_id}-#{checkbox.checkbox_id}")}>{gettext("Cancel")}</button>
                    </div>
                  </div>
                  <form phx-submit="edit_checkbox" phx-change="validate_edit_checkbox_name" phx-value-checklist_id={checklist.checklist_id} phx-value-checkbox_id={checkbox.checkbox_id} class={"edit-item-form edit-item-form-#{checklist.checklist_id}-#{checkbox.checkbox_id} flex-start hidden"} phx-click-away={JS.add_class("hidden", to: ".edit-item-form-#{checklist.checklist_id}-#{checkbox.checkbox_id}")}>
                    <.input name="checkbox_name" value={@edit_checkbox_name} placeholder={gettext("Edit item name")} style={%{main: "", inner: "margin: 0;", label: ""}}/>
                    <.button disabled={@edit_checkbox_name in [nil, ""] or @edit_checkbox_name == checkbox.name} phx-click={JS.add_class("hidden", to: ".edit-item-form-#{checklist.checklist_id}-#{checkbox.checkbox_id}")}>{gettext("Edit item")}</.button>
                  </form>
                </div>
                <.button class={"add-item add-item-#{checklist.checklist_id}"} phx-click={JS.remove_class("hidden", to: ".new-item-form-#{checklist.checklist_id}") |> JS.add_class("hidden", to: ".add-item-#{checklist.checklist_id}")}>{gettext("Add an item")}</.button>
                <form phx-submit="add_new_checkbox" phx-change="validate_new_checkbox_name" phx-value-checklist_id={checklist.checklist_id} class={"new-item-form new-item-form-#{checklist.checklist_id} items-start hidden"} phx-click-away={JS.add_class("hidden", to: ".new-item-form-#{checklist.checklist_id}") |> JS.remove_class("hidden", to: ".add-item-#{checklist.checklist_id}")}>
                  <.input name="checkbox_name" value={@new_checkbox_name} placeholder={gettext("New item name")}/>
                  <.button disabled={@new_checkbox_name in [nil, ""]} phx-click={JS.add_class("hidden", to: ".new-item-form-#{checklist.checklist_id}") |> JS.remove_class("hidden", to: ".add-item-#{checklist.checklist_id}")}>{gettext("Create new item")}</.button>
                </form>
              </div>
            </div>
            <div class="detailed-container width100 flex-start relative">
              <.icon name="hero-list-bullet" class="icon" />
              <h4 class="flex-start justify">{gettext("Activity")} </h4>
              <.button class="show-details-button absolute" phx-click="toggle_details_activity" :if={Enum.count(@selected_card.activity, fn activity -> activity.action == "moved" end) > 0}>{if @activity_details, do: gettext("Hide"), else: gettext("Show")} {gettext("Details")}</.button>
              <div class="activity-container width100">
                <div class="width100 activity-item add-comment">
                  <div class="heading flex-start items-start width100">
                    <div class="circle-letter"> {String.capitalize(String.first(@current_user.email))} </div>
                    <button class="width100 flex-start add-comment-button" phx-click={JS.remove_class("hidden", to: ".new-comment-form") |> JS.add_class("hidden", to: ".add-comment-button")}>{gettext("Write a comment")}...</button>
                    <form phx-submit="add_comment" phx-change="validate_new_comment" class="new-comment-form hidden" phx-click-away={JS.add_class("hidden", to: ".new-comment-form") |> JS.remove_class("hidden", to: ".add-comment-button")}>
                      <textarea name="comment-input" class="comment-input width100" value={@new_comment} rows="1" placeholder={gettext("Write a comment...")}></textarea>
                      <.button disabled={@new_comment == ""} phx-click={JS.add_class("hidden", to: ".new-comment-form") |> JS.remove_class("hidden", to: ".add-comment-button")}>{gettext("Add new comment")}</.button>
                      <.button type="button" class="cancel" phx-click={JS.add_class("hidden", to: ".new-comment-form") |> JS.remove_class("hidden", to: ".add-comment-button")}>{gettext("Cancel")}</.button>
                    </form>
                  </div>
                </div>
                <div class="width100 activity-item" :for={activity_item <- Enum.reverse(@selected_card.activity)}  :if={activity_item.action in ["moved"] and @activity_details or activity_item.action not in ["moved"]}>
                  <div class={"heading width100 #{if activity_item.user == @current_user.email and activity_item.action not in ["create"], do: "space-between", else: "flex-start"}"}>
                    <div>
                      <div class="circle-letter"> {String.capitalize(String.first(activity_item.user))} </div>
                      {activity_item.user} &nbsp;<span class="datetime"> {if is_struct(activity_item.datetime, DateTime), do: Calendar.strftime(activity_item.datetime, "%d %b %Y, %H:%M"), else: Calendar.strftime(elem(DateTime.from_iso8601(activity_item.datetime), 1), "%d %b %Y, %H:%M")} </span>
                      &nbsp;<span class="datetime" :if={activity_item.edited == "true"}>({gettext("Edited")})</span>
                    </div>
                    <div class="edit-buttons-container relative">
                      <button :if={activity_item.user == @current_user.email and activity_item.action not in ["create", "moved"]} class="edit" aria-label={gettext("Edit comment")} phx-click={JS.remove_class("hidden", to: ".edit-comment-form-#{activity_item.activity_id}") |> JS.add_class("hidden", to: ".comment-#{activity_item.activity_id}")}> <.icon name="hero-pencil"/> </button>
                      <button :if={activity_item.user == @current_user.email and activity_item.action not in ["create", "moved"]} class="delete" aria-label={gettext("Delete comment")} phx-click={JS.remove_class("hidden", to: ".delete-comment-#{activity_item.activity_id}")}> <.icon name="hero-trash"/> </button>
                      <div class={"delete-comment delete-comment-#{activity_item.activity_id} layer3 absolute content-baseline space-evenly hidden"} phx-click-away={JS.add_class("hidden", to: ".delete-comment-#{activity_item.activity_id}")}>
                        <h4>{gettext("Are you sure?")}</h4>
                        <button phx-value-comment_id={activity_item.activity_id} phx-click={JS.add_class("hidden", to: ".delete-comment-#{activity_item.activity_id}") |> JS.push("delete_comment")}>{gettext("Yes, delete comment")}</button>
                        <button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-comment-#{activity_item.activity_id}")}>{gettext("Cancel")}</button>
                      </div>
                    </div>
                  </div>
                  <div class="card-info width100 flex-start">
                    <p class="width100 flex-start" :if={activity_item.action in ["create"]}> {gettext("Created card")} "{@selected_card.name}" </p>
                    <p class="width100 flex-start" :if={activity_item.action in ["moved"]}> {gettext("Moved card")} {gettext("from")} "{Enum.at(String.split(activity_item.comment, ";"), 0)}" {gettext("to")} "{Enum.at(String.split(activity_item.comment, ";"), 1)}" </p>
                    <p class={"width100 flex-start comment comment-#{activity_item.activity_id}"} :if={activity_item.action not in ["create", "moved"] and activity_item.comment != nil and String.length(activity_item.comment) > 0}>{activity_item.comment}</p>
                    <form phx-submit="edit_comment" phx-change="validate_edit_comment" phx-value-comment={if @edit_comment == "", do: activity_item.comment, else: @edit_comment} phx-value-comment_id={activity_item.activity_id} class={"edit-comment-form edit-comment-form-#{activity_item.activity_id} width100 hidden"} phx-click-away={JS.add_class("hidden", to: ".edit-comment-form-#{activity_item.activity_id}") |> JS.remove_class("hidden", to: ".comment-#{activity_item.activity_id}")}>
                      <textarea name="comment-edit" class="comment-edit width100" value={if @edit_comment == "", do: activity_item.comment, else: @edit_comment} rows="1">{if @edit_comment == "", do: activity_item.comment, else: @edit_comment}</textarea>
                      <.button disabled={@edit_comment == "" or @edit_comment == activity_item.comment} phx-click={JS.add_class("hidden", to: ".edit-comment-form-#{activity_item.activity_id}") |> JS.remove_class("hidden", to: ".comment-#{activity_item.activity_id}")}>{gettext("Edit comment")}</.button>
                      <.button type="button" class="cancel" phx-click={JS.add_class("hidden", to: ".edit-comment-form-#{activity_item.activity_id}") |> JS.remove_class("hidden", to: ".comment-#{activity_item.activity_id}")}>{gettext("Cancel")}</.button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-sidebar">
            <div class="sidebar-menu width100">
              <%= if @current_user.email in @selected_card.members do %>
                <button class="width100 bold flex-start" phx-click="leave_card"><.icon name="hero-user-minus"/>&nbsp; <span class="button-name">{gettext("Leave")}</span></button>
              <% else %>
                <button class="width100 bold flex-start" phx-click="join_card"><.icon name="hero-user-plus"/>&nbsp; <span class="button-name">{gettext("Join")}</span></button>
              <% end %>
            </div>
            <div class="sidebar-menu width100 relative">
              <button class="width100 bold flex-start" phx-click={JS.remove_class("hidden", to: ".add-card-member-container")}><.icon name="hero-users"/>&nbsp; <span class="button-name">{gettext("Members")}</span></button>
              <div class="add-card-member-container layer3 content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".add-card-member-container")}>
                <div class="button-container layer3 flex-end absolute">
                  <button phx-click={JS.add_class("hidden", to: ".add-card-member-container")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
                </div>
                <h4>{gettext("Add Members")}:</h4>
                <form phx-change="validate_new_member_in_card" phx-submit="add_card_member">
                  <.input type="select" prompt={gettext("Select a member to add...")} name="member" options={if @current_user.email in @current_board.owners, do: Enum.filter(Enum.map(@users,fn user -> user.email end), fn user -> user not in @selected_card.members and (user in @current_board.owners or user in @current_board.members) end), else: (if @current_user.email in @selected_card.members, do: [], else: [@current_user.email])} value="" style={%{ main: "width: 100%;", inner: "", label: ""}}  />
                  <.button type="submit" disabled={@new_card_member_email in [nil, ""]} class="add-new-member-button">{gettext("Add Member to card")}</.button>
                </form>
                <h4>{gettext("Current members")}: </h4>
                <div class="current-member width100 space-between" :for={member <- @selected_card.members}>
                  <h5 class="flex-start"> {member} </h5>
                  <button phx-value-removed_member={member} phx-click="remove_member_from_card" :if={@current_user.email in @current_board.owners or member == @current_user.email}> <.icon name="hero-x-mark-solid" /> </button>
                </div>
              </div>
            </div>
            <div class="sidebar-menu width100 relative" phx-click-away={JS.add_class("hidden", to: ".add-labels")}>
              <button class="width100 bold flex-start" phx-click={JS.remove_class("hidden", to: ".add-labels")}><.icon name="hero-tag"/>&nbsp; <span class="button-name">{gettext("Labels")}</span></button>
              <div class="add-labels layer3 absolute content-baseline hidden">
                <div class="labels-default-list width100">
                  <%= for label <- Enum.filter(@labels, fn label -> label.board == 0 end) do %>
                    <div class={"label-item label-item-#{label.id} width100 pointer"} data-label-id={label.id} style={"background-color: #{label.color};"} phx-click-away={JS.add_class("hidden", to: ".edit-label-#{label.id}") |> JS.remove_class("hidden", to: ".label-item-choose-#{label.id}") |> JS.remove_class("hidden", to: ".edit-#{label.id}") |> JS.add_class("hidden", to: ".edit-complete-#{label.id}") |> JS.remove_class("editing", to: ".label-item-#{label.id}")}>
                      <span class={"label-item-choose label-item-choose-#{label.id} width100"}>{if label.name == "", do: "Unnamed Label", else: label.name} <.icon name="hero-check" class="active absolute" :if={Enum.member?(@selected_card.labels, label.id)}/></span>
                    </div>
                  <% end %>
                </div>
                <div class="labels-list width100">
                  <%= for label <- Enum.filter(@labels, fn label -> @current_board.id == label.board end) do %>
                    <div class={"label-item label-item-#{label.id} width100 pointer"} data-label-id={label.id} style={"background-color: #{label.color};"} phx-click-away={JS.add_class("hidden", to: ".edit-label-#{label.id}") |> JS.remove_class("hidden", to: ".label-item-choose-#{label.id}") |> JS.remove_class("hidden", to: ".edit-#{label.id}") |> JS.add_class("hidden", to: ".edit-complete-#{label.id}") |> JS.remove_class("editing", to: ".label-item-#{label.id}")}>
                      <span class={"label-item-choose label-item-choose-#{label.id} width100"}>{if label.name == "", do: "Unnamed Label", else: label.name} <.icon name="hero-check" class="active absolute" :if={Enum.member?(@selected_card.labels, label.id)}/></span>
                      <form class={"edit-label-#{label.id} hidden"} phx-submit="edit_label" phx-value-label_id={label.id}>
                        <div class="inputs relative">
                          <.input type="text" name="edit-label" placeholder={gettext("Edit Label Name")} value={label.name} style={%{main: "width: 65%;", label: "", inner: "margin: 0;"}}/>
                          <.input type="color" name="edit-label-color" value="transparent" value={rgba_to_hex(label.color)} style={%{main: "width: 15%;", label: "", inner: "height: 2.5rem; margin: 0;"}}/>
                          <button type="button" class={"delete-label-button delete-label-#{label.id} hidden"} phx-click={JS.remove_class("hidden", to: ".delete-label")}><.icon name="hero-trash" /></button>
                          <div class="delete-label layer3 absolute content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".delete-label")}>
                            <h4>{gettext("Are you sure?")}</h4>
                            <button type="button" phx-value-label_id={label.id} phx-click={JS.add_class("hidden", to: ".delete-label") |> JS.push("delete_label")}>{gettext("Yes, delete label")}</button>
                            <button type="button" class="cancel" phx-click={JS.add_class("hidden", to: ".delete-label")}>{gettext("Cancel")}</button>
                          </div>
                        </div>
                      </form>
                      <button class={"edit edit-#{label.id} absolute"} phx-click={JS.remove_class("hidden", to: ".edit-label-#{label.id}") |> JS.add_class("hidden", to: ".label-item-choose-#{label.id}") |> JS.add_class("hidden", to: ".edit-#{label.id}") |> JS.remove_class("hidden", to: ".edit-complete-#{label.id}") |> JS.remove_class("hidden", to: ".delete-label-#{label.id}") |> JS.add_class("editing", to: ".label-item-#{label.id}")} phx-value-label_id={label.id}><.icon name="hero-pencil" /></button>
                      <button class={"edit-complete edit-complete-#{label.id} absolute hidden"} phx-click={JS.add_class("hidden", to: ".edit-label-#{label.id}") |> JS.remove_class("hidden", to: ".label-item-choose-#{label.id}") |> JS.remove_class("hidden", to: ".edit-#{label.id}") |> JS.add_class("hidden", to: ".edit-complete-#{label.id}") |> JS.add_class("hidden", to: ".delete-label-#{label.id}") |> JS.remove_class("editing", to: ".label-item-#{label.id}") |> JS.dispatch("submit", to: ".edit-label-#{label.id}")}><.icon name="hero-check" /></button>
                    </div>
                  <% end %>
                </div>
                <hr class="width100">
                <button class="add-label-item width100" phx-click={JS.remove_class("hidden", to: ".new-label") |> JS.add_class("hidden", to: ".add-label-item")}> {gettext("Create a new label")} </button>
                <form class="new-label hidden" phx-submit="add_label" phx-click-away={JS.add_class("hidden", to: ".new-label") |> JS.remove_class("hidden", to: ".add-label-item")}>
                  <div class="inputs">
                    <.input type="text" name="new-label" placeholder={gettext("New Label Name")} value="" style={%{main: "width: 80%;", label: "", inner: "margin: 0;"}}/>
                    <.input type="color" name="new-label-color" value="transparent" style={%{main: "width: 15%;", label: "", inner: "height: 2.5rem; margin: 0;"}}/>
                  </div>
                  <button phx-click={JS.add_class("hidden", to: ".new-label") |> JS.remove_class("hidden", to: ".add-label-item") |> JS.dispatch("reset_labels_form", to: "#trello-content")}> <.icon name="hero-check"/> </button>
                </form>
              </div>
            </div>
            <div class="sidebar-menu width100 relative">
              <button class="width100 bold flex-start" phx-click={JS.remove_class("hidden", to: ".add-checkbox-container")}><.icon name="hero-check-circle"/>&nbsp; <span class="button-name">{gettext("Checklist")}</span></button>
              <div class="add-checkbox-container layer3 content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".add-checkbox-container")}>
                <div class="button-container layer3 flex-end absolute">
                  <button phx-click={JS.add_class("hidden", to: ".add-checkbox-container")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
                </div>
                <h4>{gettext("Add Checklist")}:</h4>
                <form phx-change="validate_checklist_name" phx-submit="add_new_checklist">
                  <.input type="text" placeholder={gettext("Name your checklist")} name="checklist_name" value={@new_checklist_name} style={%{ main: "width: 100%;", inner: "", label: ""}}  />
                  <.button phx-click={JS.add_class("hidden", to: ".add-checkbox-container")} type="submit" disabled={@new_checklist_name in [nil, ""]} class="add-new-checklist-button">{gettext("Add New Checklist")}</.button>
                </form>
              </div>
            </div>
            <div class="sidebar-menu width100" phx-click-away={JS.add_class("hidden", to: ".add-due-date")}>
              <button class="width100 bold flex-start" id="trello-calendar-prompt" phx-click={JS.remove_class("hidden", to: ".add-due-date")}><.icon name="hero-clock"/>&nbsp; <span class="button-name">{gettext("Dates")}</span></button>
              <div class="add-due-date layer3 absolute content-baseline hidden">
                <.calendar class="trello-due-date" config={%{date_format: "d-m-Y", time_format: "H:i", alt_format: "j M Y, H:i", calendar_mode: "single", clock_type: 24, week_start: 1, inline_calendar: 1}} options={%{default_date: @selected_card.dueDate, min_date: "", max_date: "", disabled_dates: "", dates_conjunction: " & ", min_time: "", max_time: "", allow_input: 0, enable_seconds: 0, minute_increment: 1, short_month_name: 0, months_to_show: 1, month_dropdown: 1, calendar_theme: "light"}}/>
                <hr class="width100">
                <div class="buttons-container width100 space-around">
                  <button class="clear-due-date-button"> {gettext("Clear Due Date")} </button>
                </div>
              </div>
            </div>
            <div class="sidebar-menu width100 relative">
              <button class="width100 bold flex-start" phx-click={JS.remove_class("hidden", to: ".add-attachment")}><.icon name="hero-paper-clip"/>&nbsp; <span class="button-name">{gettext("Attachment")}</span></button>
              <div class="add-attachment layer3 absolute content-baseline hidden" phx-click-away={JS.add_class("hidden", to: ".add-attachment")}>
                <div class="button-container layer3 flex-end absolute">
                  <button phx-click={JS.add_class("hidden", to: ".add-attachment")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
                </div>
                <h4>{gettext("Add Attachments")}</h4>
                <div class="attachment-type-select width100">
                  <button class="file-button width50 active" phx-click={JS.add_class("active", to: ".file-button") |> JS.remove_class("active", to: ".link-button") |> JS.remove_class("hidden", to: ".add-file-section") |> JS.add_class("hidden", to: ".add-link-section")}>{gettext("Upload File")}</button>
                  <button class="link-button width50" phx-click={JS.remove_class("active", to: ".file-button") |> JS.add_class("active", to: ".link-button") |> JS.add_class("hidden", to: ".add-file-section") |> JS.remove_class("hidden", to: ".add-link-section")}>{gettext("Upload Link")}</button>
                </div>
                <form class="add-file-section" phx-submit={JS.add_class("hidden", to: ".add-attachment") |> JS.push("add_attachment")} phx-change="validate">
                  <div class="hint">
                    <span class="width100">{gettext("Select a file to upload")}</span>
                    <div class="drop" phx-drop-target={@uploads.attachment.ref}> <.live_file_input upload={@uploads.attachment} /> {gettext("or drag and drop here")} </div>
                    <.error :for={err <- upload_errors(@uploads.attachment)}> {Phoenix.Naming.humanize(err)} </.error>
                  </div>
                  <.button class="upload-button">{gettext("Upload file")}</.button>
                </form>
                <form class="add-link-section hidden width100" phx-change="validate" phx-submit={JS.add_class("hidden", to: ".add-attachment") |> JS.push("add_link")}>
                  <.input name="link_path" value="" placeholder={gettext("Link URL")} class="width100"/>
                  <.input name="link_display_name" value="" placeholder={gettext("Link Display Name")} class="width100"/>
                  <.button class="upload-button width50">{gettext("Upload link")}</.button>
                </form>
              </div>
            </div>
            <div class="sidebar-menu width100 delete-card-container relative">
              <button class="width100 bold flex-start" phx-click={JS.remove_class("hidden", to: ".delete-card")} :if={@current_user.email in @current_board.owners}><.icon name="hero-trash"/>&nbsp; <span class="button-name">{gettext("Delete Card")}</span></button>
              <div class="delete-card layer3 absolute content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".delete-card")}>
                <h4>{gettext("Are you sure?")}</h4>
                <button phx-value-card_id={@selected_card.id} phx-click={JS.add_class("hidden", to: ".delete-card") |> JS.add_class("hidden", to: "#board-card-detailed") |> JS.remove_class("detailed-card-#{@selected_card.id}", to: "#board-card-detailed") |> JS.push("delete_card")}>{gettext("Yes, delete card")}</button>
                <button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-card")}>{gettext("Cancel")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </.focus_wrap>
    <.focus_wrap id="create-new-board" class="create-new-board fixed hidden layer2">
      <div class="create-new-board-modal fixed" phx-click-away={JS.add_class("hidden", to: "#create-new-board")}>
        <div class="button-container layer3 flex-end absolute">
          <button phx-click={JS.add_class("hidden", to: "#create-new-board")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
        </div>
        <h4>{gettext("Create a new board")}:</h4>
        <form phx-submit={JS.add_class("hidden", to: "#create-new-board") |> JS.push("create_board")} phx-change="validate">
          <.input type="hidden" name="new_board_id" value={length(@boards)+1}/>
          <.input name="new_board_name" id="new_board_name" value="" placeholder={gettext("Board Name:")} style={%{main: "width: 100%;", label: "", inner: ""}}/>
          <div class="hint">
            <span class="width100">{gettext("Add board photo")} ({gettext("max size")}: {trunc(@uploads.board_photo.max_file_size / 1_000_000)} MB)</span>
            <div class="drop" phx-drop-target={@uploads.board_photo.ref}> <.live_file_input upload={@uploads.board_photo} /> {gettext("or drag and drop here")} </div>
            <.error :for={err <- upload_errors(@uploads.board_photo)}> {Phoenix.Naming.humanize(err)} </.error>
            <div :for={entry <- @uploads.board_photo.entries} class="entry">
              <.live_img_preview entry={entry} class="max-w-full h-auto" />
              <button type="button" phx-click="cancel-upload" phx-value-ref={entry.ref} phx-value-action={:board_photo}> {gettext("Remove")} </button>
            </div>
          </div>
          <.button type="submit">{gettext("Create new board")}</.button>
        </form>
      </div>
    </.focus_wrap>
    <.focus_wrap id="edit-board" class="edit-board fixed hidden layer2">
      <div class="edit-board-modal fixed" phx-click-away={JS.add_class("hidden", to: "#edit-board")}>
        <div class="button-container layer3 flex-end absolute">
          <button phx-click={JS.add_class("hidden", to: "#edit-board")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
        </div>
        <h4>{gettext("Edit board")}:</h4>
        <form phx-submit={JS.add_class("hidden", to: "#edit-board") |> JS.push("edit_board")} phx-change="validate">
          <.input type="hidden" name="edit_board_id" value={@current_board.id}/>
          <.input name="edit_board_name" id="edit_board_name" value={@current_board.name} placeholder={gettext("Board Name:")} style={%{main: "width: 100%;", label: "", inner: ""}}/>
          <div class="hint">
            <span class="width100">{gettext("Change board photo")} ({gettext("max size")}: {trunc(@uploads.edit_board_photo.max_file_size / 1_000_000)} MB)</span>
            <div class="drop" phx-drop-target={@uploads.edit_board_photo.ref}> <.live_file_input upload={@uploads.edit_board_photo} /> {gettext("or drag and drop here")} </div>
            <.error :for={err <- upload_errors(@uploads.edit_board_photo)}> {Phoenix.Naming.humanize(err)} </.error>
            <%= if @uploads.edit_board_photo.entries != [] do %>
              <div :for={entry <- @uploads.edit_board_photo.entries} class="entry">
                <.live_img_preview entry={entry} class="max-w-full h-auto" />
                <button type="button" phx-click="cancel-upload" phx-value-ref={entry.ref} phx-value-action={:edit_board_photo}> {gettext("Remove")} </button>
              </div>
            <% else %>
              <%= if @current_board.bg_image != "" do %>
                <h4 class="width100">{gettext("Current photo")}: </h4>
                <div class="entry">
                  <img src={~p"/uploads/#{@current_board.bg_image}"} class="max-w-full h-auto" />
                </div>
              <% else %>
                <h4>{gettext("No photo for this board yet.")}</h4>
              <% end %>
            <% end %>
          </div>
          <.button type="submit">{gettext("Edit board")}</.button>
        </form>
        <.button class="delete-board-button absolute" phx-click={JS.remove_class("hidden", to: ".delete-board")}>{gettext("Delete board")}</.button>
        <div class="delete-board layer3 content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".delete-board")}>
          <h4 class="width100">{gettext("Are you sure?")}</h4>
          <.button class="delete-board-button" phx-click={JS.add_class("hidden", to: ".delete-board") |> JS.add_class("hidden", to: "#edit-board") |> JS.push("delete_board")}>{gettext("Yes, delete board")}</.button>
          <.button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-board")}>{gettext("Cancel")}</.button>
        </div>
      </div>
    </.focus_wrap>
    """
  end

  def handle_info({:update_lists}, socket) do
    if socket.assigns.selected_card do
      {:noreply, socket |> assign(:lists, Enum.sort_by(Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id).lists, fn list -> list.order end)) |> assign(:selected_card, Trello.get_card!(socket.assigns.selected_card.id))}
    else
      {:noreply, socket |> assign(:lists, Enum.sort_by(Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id).lists, fn list -> list.order end))}
    end
  end

  def handle_info({:update_labels}, socket) do
    {:noreply, assign(socket, :labels, Enum.sort_by(Enum.filter(Trello.list_labels(), fn label -> label.board == 0 end), fn label -> label.id end) ++ Enum.sort_by(Enum.filter(Trello.list_labels(), fn label -> socket.assigns.current_user.email in label.user end), fn label -> label.id end))}
  end

  def handle_info({:update_boards, info}, socket) do
    user = info.user
    case info.action_board do
      "none" -> {:noreply, socket |> assign(boards: Enum.sort_by(Enum.filter(Trello.list_boards(), fn board -> socket.assigns.current_user.email in board.owners or socket.assigns.current_user.email in board.members end), fn board -> board.id end)) |> assign(current_board: Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id))}
      _ -> case socket.assigns.current_user.email do
        ^user -> {:noreply, socket |> redirect(to: ~p"/boards")}
        _ -> {:noreply, socket |> assign(boards: Enum.sort_by(Enum.filter(Trello.list_boards(), fn board -> socket.assigns.current_user.email in board.owners or socket.assigns.current_user.email in board.members end), fn board -> board.id end)) |> assign(current_board: Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id))}
      end
    end
  end

  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  def handle_event("validate_new_comment", %{"comment-input" => value}, socket) do
    {:noreply, assign(socket, new_comment: value)}
  end

  def handle_event("validate_edit_comment", %{"comment-edit" => value}, socket) do
    {:noreply, assign(socket, edit_comment: value)}
  end

  def handle_event("validate_new_member_in_board", %{"member" => member, "role" => role}, socket) do
    {:noreply, socket |> assign(new_board_member_email: member) |> assign(new_board_member_role: role)}
  end

  def handle_event("validate_new_member_in_card", %{"member" => member}, socket) do
    {:noreply, socket |> assign(new_card_member_email: member)}
  end

  def handle_event("validate_checklist_name", %{"checklist_name" => checklist_name}, socket) do
    {:noreply, assign(socket, new_checklist_name: checklist_name)}
  end

  def handle_event("validate_new_checkbox_name", %{"checkbox_name" => checkbox_name}, socket) do
    {:noreply, assign(socket, new_checkbox_name: checkbox_name)}
  end

  def handle_event("validate_edit_checkbox_name", %{"checkbox_name" => checkbox_name}, socket) do
    {:noreply, assign(socket, edit_checkbox_name: checkbox_name)}
  end

  def handle_event("assign_edit_checkbox_name", %{"checkbox_name" => checkbox_name}, socket) do
    {:noreply, assign(socket, edit_checkbox_name: checkbox_name)}
  end

  def handle_event("toggle_cards_visibility", _params, socket) do
    if socket.assigns.cards_toggle == true, do: {:noreply, assign(socket, cards_toggle: false)}, else: {:noreply, assign(socket, cards_toggle: true)}
  end

  def handle_event("toggle_details_activity", _params, socket) do
    if socket.assigns.activity_details == true, do: {:noreply, assign(socket, activity_details: false)}, else: {:noreply, assign(socket, activity_details: true)}
  end

  def handle_event("cancel-upload", %{"ref" => ref, "action" => action}, socket) do
    {:noreply, cancel_upload(socket, String.to_atom(action), ref)}
  end

  def handle_event("create_board", params, socket) do
    bg_image_path = case socket.assigns.uploads.board_photo.entries do
      [] -> "trello-board-placeholder.png"
      _ -> consume_uploaded_entries(socket, :board_photo, fn meta, entry ->
        dest = Path.join(["priv", "static", "uploads", "#{entry.uuid}-#{entry.client_name}"])
        File.cp!(meta.path, dest)
        {:ok, Path.basename(dest)}
      end) |> List.first()
    end
    Trello.create_board(%{name: params["new_board_name"], bg_image: bg_image_path, owners: [socket.assigns.current_user.email], members: []})
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: "none", user: "none"}})
    {:noreply, put_flash(socket, :info, gettext("Board created successfully!"))}
  end

  def handle_event("edit_board", params, socket) do
    bg_image_path =
      if socket.assigns.uploads.edit_board_photo.entries != [] do
        consume_uploaded_entries(socket, :edit_board_photo, fn meta, entry ->
          dest = Path.join(["priv", "static", "uploads", "#{entry.uuid}-#{entry.client_name}"])
          File.cp!(meta.path, dest)
          {:ok, Path.basename(dest)}
        end) |> List.first()
      else
        socket.assigns.current_board.bg_image
      end
    Trello.update_board(socket.assigns.current_board, %{name: params["edit_board_name"], bg_image: bg_image_path})
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: "none", user: "none"}})
    {:noreply, put_flash(socket, :info, gettext("Board edited successfully!"))}
  end

  def handle_event("delete_board", _, socket) do
    Trello.delete_board(socket.assigns.current_board)
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: socket.assigns.current_board_id, user: socket.assigns.current_user.email}})
    {:noreply, socket |> put_flash(:info, gettext("Board deleted successfully!"))}
  end

  def handle_event("add_board_member", %{"member" => member, "role" => role}, socket) do
    Trello.add_board_member(socket.assigns.current_board, member, role)
    for label <- Trello.get_labels_in_board(socket.assigns.current_board_id) do
      if label.board != 0 do
        Trello.update_label(label, %{user: label.user ++ [member]})
      end
    end
    PubSub.broadcast(App.PubSub, "board_update", {:update_labels})
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: "none", user: "none"}})
    {:noreply, socket |> put_flash(:info, "#{gettext("Member")} #{member} #{gettext("added successfully")}!") |> assign(new_board_member_email: nil) |> assign(new_board_member_role: nil)}
  end

  def handle_event("edit_board_member", %{"role" => role, "member" => member}, socket) do
    Trello.update_board_membership(socket.assigns.current_board, member, role)
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: "none", user: "none"}})
    {:noreply, socket}
  end

  def handle_event("remove_board_member", %{"member" => member}, socket) do
    Trello.delete_board_member(socket.assigns.current_board, member, "Member")
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: socket.assigns.current_board_id, user: member}})
    socket = socket |> put_flash(:info, "#{gettext("Member")} #{member} #{gettext("deleted successfully")}!")
    for label <- Trello.get_labels_in_board(socket.assigns.current_board_id) do
      Trello.update_label(label, %{user: Enum.reject(label.user, fn user -> user == member end)})
    end
    PubSub.broadcast(App.PubSub, "board_update", {:update_labels})
    case socket.assigns.current_user.email do
      ^member -> {:noreply, redirect(socket, to: "/boards")}
      _ -> {:noreply, socket}
    end
  end

  def handle_event("remove_board_owner", %{"owner" => owner}, socket) do
    Trello.delete_board_member(socket.assigns.current_board, owner, "Owner")
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, %{action_board: socket.assigns.current_board_id, user: owner}})
    socket = socket |> put_flash(:info, "#{gettext("Owner")} #{owner} #{gettext("deleted successfully")}!")
    case socket.assigns.current_user.email do
      ^owner -> {:noreply, redirect(socket, to: "/boards")}
      _ -> {:noreply, socket}
    end
  end

  def handle_event("toggle_labels_visibility", _params, socket) do
    {:noreply, update(socket, :label_text_visible, &(!&1))}
  end

  def handle_event("cancel_new_card", _params, socket) do
    {:noreply, assign(socket, :new_card_name, "")}
  end

  def handle_event("add_card_member", %{"member" => member}, socket) do
    Trello.update_card(socket.assigns.selected_card, %{members: Trello.get_card!(socket.assigns.selected_card.id).members ++ [member]})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("remove_member_from_card", %{"removed_member" => removed_member}, socket) do
    Trello.update_card(socket.assigns.selected_card, %{members: Enum.reject(Trello.get_card!(socket.assigns.selected_card.id).members, fn member -> member == removed_member end)})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("join_card", _params, socket) do
    Trello.update_card(socket.assigns.selected_card, %{members: Trello.get_card!(socket.assigns.selected_card.id).members ++ [socket.assigns.current_user.email]})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("leave_card", _params, socket) do
    Trello.update_card(socket.assigns.selected_card, %{members: Enum.reject(Trello.get_card!(socket.assigns.selected_card.id).members, fn member -> member == socket.assigns.current_user.email end)})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("add_comment", _, socket) do
    Trello.create_activity_for_card(socket.assigns.selected_card.id, %{activity_id: (if Trello.get_activities_in_card(socket.assigns.selected_card.id) == [], do: 1, else: Enum.max_by(Trello.get_activities_in_card(socket.assigns.selected_card.id), fn activity -> activity.activity_id end).id + 1), user: socket.assigns.current_user.email, action: "", comment: socket.assigns.new_comment, datetime: DateTime.utc_now(), edited: "false"})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, assign(socket, :new_comment, "")}
  end

  def handle_event("edit_comment", %{"comment_id" => comment_id, "comment" => value}, socket) do
    socket = assign(socket, edit_comment: value)
    Trello.edit_activity(Trello.get_activity!(comment_id, socket.assigns.selected_card.id), %{comment: value, edited: "true"})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, assign(socket, :edit_comment, "")}
  end

  def handle_event("delete_comment", %{"comment_id" => comment_id}, socket) do
    Trello.delete_activity(Trello.get_activity!(comment_id, socket.assigns.selected_card.id))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_new_card_name", %{"value" => new_card_name}, socket) do
    {:noreply, assign(socket, :new_card_name, new_card_name)}
  end

  def handle_event("update_list_name", %{"value" => list_name, "list_id" => list_id}, socket) do
    case Trello.update_list(list_id, %{name: list_name}) do
      {:ok, _} ->
        PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
        {:noreply, put_flash(socket, :info, gettext("List name updated successfully!"))}
      {:error, changeset} -> {:noreply, socket |> put_flash(:error, "#{gettext("Failed to update list name")}: #{inspect(changeset.errors)}")}
    end
  end

  def handle_event("cancel_new_list", _params, socket) do
    {:noreply, assign(socket, :new_list_name, "")}
  end

  def handle_event("update_new_list_name", %{"value" => new_list_name}, socket) do
    {:noreply, assign(socket, :new_list_name, new_list_name)}
  end

  def handle_event("open_card", params, socket) do
    {:noreply, socket |> assign(selected_card: Trello.get_card!(params["id"])) |> push_patch(to: ~p"/boards/#{socket.assigns.current_board.id}/#{String.replace(socket.assigns.current_board.name, " ", "-")}?card=#{params["id"]}")}
  end

  def handle_event("close_card", _params, socket) do
    {:noreply, socket |> assign(selected_card: nil) |> push_patch(to: ~p"/boards/#{socket.assigns.current_board.id}/#{String.replace(socket.assigns.current_board.name, " ", "-")}")}
  end

  def handle_event("add_new_card", %{"list_id" => list_id, "new_card_name" => new_card_name}, socket) do
    Trello.create_card_for_list(String.to_integer("#{list_id}"), %{order: (if Trello.list_cards_in_list(list_id) == [], do: 1, else: Enum.max_by(Trello.list_cards_in_list(list_id), fn card -> card.order end).order + 1), name: new_card_name, description: "", labels: [], dueDate: "", completed: "false", members: (if socket.assigns.cards_toggle, do: [socket.assigns.current_user.email], else: []), attachments: [], checklists: [], activity: [] })
    Trello.create_activity_for_card(Enum.max_by(Trello.list_all_cards(), fn card -> card.id end).id, %{activity_id: 1, user: socket.assigns.current_user.email, action: "create", comment: "", datetime: DateTime.utc_now(), edited: "false" })
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket |> assign(:new_card_name, "") |> put_flash(:info, gettext("Card created successfully!"))}
  end

  def handle_event("delete_card", %{"card_id" => card_id}, socket) do
    Trello.delete_card(Trello.get_card!(card_id))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket |> assign(selected_card: nil) |> push_patch(to: ~p"/boards/#{socket.assigns.current_board.id}/#{String.replace(socket.assigns.current_board.name, " ", "-")}") |> put_flash(:info, gettext("Card deleted successfully!"))}
  end

  def handle_event("add_new_list", %{"new_list_name" => new_list_name}, socket) do
    case Trello.create_list_for_board(socket.assigns.current_board_id, %{name: new_list_name, cards: [], order: length(socket.assigns.lists) + 1}) do
      {:ok, _list} ->
        PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
        {:noreply, socket |> assign(:new_list_name, "") |> put_flash(:info, gettext("List created successfully!"))}
      {:error, changeset} -> {:noreply, socket |> put_flash(:error, "#{gettext("Failed to create list")}: #{inspect(changeset.errors)}")}
    end
  end

  def handle_event("delete_list", %{"list_id" => list_id}, socket) do
    Trello.delete_list(Trello.get_list!(list_id))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, put_flash(socket, :info, gettext("List deleted successfully!"))}
  end

  def handle_event("update_card_in_lists", %{"movedCardId" => movedCardId, "targetListId" => targetListId, "movedCardPosition" => movedCardPosition, "fromListId" => fromListId}, socket) do
    Trello.move_card_to_another_list(String.to_integer(movedCardId), String.to_integer(targetListId), String.to_integer(movedCardPosition))
    if ("#{targetListId}" != "#{fromListId}") do
      Trello.create_activity_for_card(movedCardId, %{activity_id: (if Trello.get_activities_in_card(movedCardId) == [], do: 1, else: Enum.max_by(Trello.get_activities_in_card(movedCardId), fn activity -> activity.activity_id end).id + 1), user: socket.assigns.current_user.email, action: "moved", comment: "#{Trello.get_list!(fromListId).name};#{Trello.get_list!(targetListId).name}", datetime: DateTime.utc_now(), edited: "false"})
    end
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_card_order", %{"cardId" => cardId, "cardOrder" => cardOrder}, socket) do
    Trello.update_card(Trello.get_card!(cardId), %{order: cardOrder})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_labels_in_card", %{"cardId" => cardId, "labelId" => labelId}, socket) do
    if labelId in Trello.get_card!(cardId).labels do
      Trello.update_card(Trello.get_card!(cardId), %{labels: Enum.reject(Trello.get_card!(cardId).labels, fn label -> label == labelId end)})
    else
      Trello.update_card(Trello.get_card!(cardId), %{labels: Trello.get_card!(cardId).labels ++ [labelId]})
    end
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_card_title", %{"newName" => newName}, socket) do
    Trello.update_card(socket.assigns.selected_card, %{name: newName})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_card_description", %{"newDescription" => newDescription}, socket) do
    Trello.update_card(socket.assigns.selected_card, %{description: newDescription})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_checklist_name", %{"checklistId" => checklistId, "newName" => newName}, socket) do
    updated_checklists = Enum.map(socket.assigns.selected_card.checklists, fn checklist ->
      if "#{checklist.checklist_id}" == "#{checklistId}" do
        # Convert to a map of attributes instead of modifying the struct directly
        %{checklist_id: checklist.checklist_id, name: newName, card_id: checklist.card_id, checkboxes: Enum.map(checklist.checkboxes, &Map.from_struct/1)}
      else
        # Convert other checklists to maps as well
        %{checklist_id: checklist.checklist_id, name: checklist.name, card_id: checklist.card_id, checkboxes: Enum.map(checklist.checkboxes, &Map.from_struct/1)}
      end
    end)
    Trello.update_card(socket.assigns.selected_card, %{checklists: updated_checklists})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_due_date_in_card", %{"dueDate" => dueDate}, socket) do
    Trello.update_card(socket.assigns.selected_card, %{dueDate: dueDate})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("update_due_date_completion_in_card", %{"check" => check}, socket) do
    Trello.update_card(socket.assigns.selected_card, %{completed: "#{check}"})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("add_label", params, socket) do
    rgb = hex_to_rgb(params["new-label-color"])
    Trello.create_label(%{name: params["new-label"], board: socket.assigns.current_board.id, color: "rgba(#{rgb.r},#{rgb.g},#{rgb.b},0.7)", user: socket.assigns.current_board.owners ++ socket.assigns.current_board.members})
    PubSub.broadcast(App.PubSub, "board_update", {:update_labels})
    {:noreply, socket}
  end

  def handle_event("edit_label", params, socket) do
    rgb = hex_to_rgb(params["edit-label-color"])
    Trello.update_label(Trello.get_label!(params["label_id"]), %{name: params["edit-label"] || Trello.get_label!(params["label_id"]).name, color: "rgba(#{rgb.r},#{rgb.g},#{rgb.b},0.7)" || Trello.get_label!(params["label_id"]).color})
    PubSub.broadcast(App.PubSub, "board_update", {:update_labels})
    {:noreply, socket}
  end

  def handle_event("delete_label", %{"label_id" => label_id}, socket) do
    Trello.delete_label(Trello.get_label!(String.to_integer(label_id)))
    PubSub.broadcast(App.PubSub, "board_update", {:update_labels})
    {:noreply, put_flash(socket, :info, gettext("Label deleted successfully!"))}
  end

  def handle_event("move_list", %{"list_id" => list_id, "direction" => direction}, socket) do
    current_list_id = String.to_integer(list_id)
    current_list = Trello.get_list!(current_list_id)
    lists = Enum.sort_by(Trello.get_board_with_lists_and_cards(socket.assigns.current_board_id).lists, & &1.order)

    case direction do
      "left" ->
        # Find the immediately adjacent list to the left (with just slightly lower order)
        previous_list = lists |> Enum.filter(fn list -> list.order < current_list.order end) |> Enum.max_by(& &1.order, fn -> nil end)
        if previous_list, do: Trello.swap_list_orders(current_list, previous_list)
      "right" ->
        # Find the immediately adjacent list to the right (with just slightly higher order)
        next_list = lists |> Enum.filter(fn list -> list.order > current_list.order end) |> Enum.min_by(& &1.order, fn -> nil end)
        if next_list, do: Trello.swap_list_orders(current_list, next_list)
    end
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("add_new_checklist", %{"checklist_name" => checklist_name}, socket) do
    Trello.create_checklist_for_card(socket.assigns.selected_card.id, %{checklist_id: (if Trello.get_checklists_in_card(socket.assigns.selected_card.id) == [], do: 1, else: Enum.max_by(Trello.get_checklists_in_card(socket.assigns.selected_card.id), fn checklist -> checklist.checklist_id end).id + 1), name: checklist_name, checkboxes: [] })
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket |> assign(:new_checklist_name, "") |> put_flash(:info, gettext("Checklist added to card successfully!"))}
  end

  def handle_event("delete_checklist", %{"checklist_id" => checklist_id}, socket) do
    Trello.delete_checklist(Trello.get_checklist!(checklist_id, socket.assigns.selected_card.id))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket |> assign(:new_checklist_name, "") |> put_flash(:info, gettext("Checklist deleted successfully!"))}
  end

  def handle_event("add_new_checkbox", %{"checklist_id" => checklist_id, "checkbox_name" => checkbox_name}, socket) do
    Trello.create_checkbox_for_checklist(checklist_id, socket.assigns.selected_card.id, %{checkbox_id: (if Trello.get_checklist!(checklist_id, socket.assigns.selected_card.id).checkboxes == [], do: 1, else: Enum.max_by(Trello.get_checklist!(checklist_id, socket.assigns.selected_card.id).checkboxes, fn checkbox -> checkbox.checkbox_id end).checkbox_id + 1), name: checkbox_name, checked: false })
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, assign(socket, :new_checkbox_name, "")}
  end

  def handle_event("checkboxes_update", %{"checklist_id" => checklist_id} = params, socket) do
    checkbox_states = params |> Enum.filter(fn {k, _v} -> String.starts_with?(k, "checkbox_#{checklist_id}_") end) |> Enum.map(fn {k, v} -> {String.replace(k, "checkbox_#{checklist_id}_", ""), v == "true"} end) |> Enum.into(%{})
    Trello.update_checkbox_states(checklist_id, socket.assigns.selected_card.id, Enum.map(Trello.get_checklist!(checklist_id, socket.assigns.selected_card.id).checkboxes, fn checkbox -> %{checkbox | checked: Map.get(checkbox_states, "#{checkbox.checkbox_id}", checkbox.checked)} end))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("edit_checkbox", %{"checkbox_name" => checkbox_name, "checklist_id" => checklist_id, "checkbox_id" => checkbox_id}, socket) do
    Trello.update_checkbox_states(checklist_id, socket.assigns.selected_card.id, Enum.map(Trello.get_checklist!(checklist_id, socket.assigns.selected_card.id).checkboxes, fn checkbox -> if "#{checkbox.checkbox_id}" == "#{checkbox_id}", do: %{checkbox | name: checkbox_name}, else: checkbox end))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, assign(socket, :edit_checkbox_name, "")}
  end

  def handle_event("delete_checkbox", %{"checkbox_id" => checkbox_id, "checklist_id" => checklist_id}, socket) do
    Trello.delete_checkbox(Trello.get_checklist!(checklist_id, socket.assigns.selected_card.id), checkbox_id)
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("add_attachment", _params, socket) do
    new_attachment = consume_uploaded_entries(socket, :attachment, fn meta, entry ->
      base_name = Path.basename(entry.client_name, Path.extname(entry.client_name))
      dest_filename = "#{base_name}-#{entry.uuid}#{Path.extname(entry.client_name)}"
      dest = Path.join(["priv", "static", "uploads", dest_filename])
      File.cp!(meta.path, dest)
      {:ok, Path.basename(dest)}
    end) |> List.first()
    original_base_name = "#{List.first(String.split(new_attachment, "-"))}.#{List.last(String.split(new_attachment, "."))}"
    Trello.create_attachment_for_card(socket.assigns.selected_card.id, %{attachment_id: (if Trello.get_attachments_in_card(socket.assigns.selected_card.id) == [], do: 1, else: Enum.max_by(Trello.get_attachments_in_card(socket.assigns.selected_card.id), fn attachment -> attachment.attachment_id end).id + 1), display_text: original_base_name, type: "file", path: new_attachment})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, put_flash(socket, :info, gettext("Upload successful!"))}
  end

  def handle_event("add_link", %{"link_display_name" => link_display_name, "link_path" => link_path}, socket) do
    Trello.create_attachment_for_card(socket.assigns.selected_card.id, %{attachment_id: (if Trello.get_attachments_in_card(socket.assigns.selected_card.id) == [], do: 1, else: Enum.max_by(Trello.get_attachments_in_card(socket.assigns.selected_card.id), fn attachment -> attachment.attachment_id end).id + 1), display_text: (if link_display_name == "", do: link_path, else: link_display_name), type: "link", path: link_path})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, put_flash(socket, :info, gettext("Upload successful!"))}
  end

  def handle_event("edit_link", %{"attachment_id" => attachment_id, "link_display_name" => link_display_name, "link_path" => link_path}, socket) do
    Trello.edit_attachment(Trello.get_attachment!(attachment_id, socket.assigns.selected_card.id), %{path: link_path, display_text: link_display_name})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("edit_file", %{"attachment_id" => attachment_id, "file_display_name" => file_display_name}, socket) do
    Trello.edit_attachment(Trello.get_attachment!(attachment_id, socket.assigns.selected_card.id), %{display_text: file_display_name})
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def handle_event("delete_attachment", %{"attachment_id" => attachment_id}, socket) do
    Trello.delete_attachment(Trello.get_attachment!(attachment_id, socket.assigns.selected_card.id))
    PubSub.broadcast(App.PubSub, "board_update", {:update_lists})
    {:noreply, socket}
  end

  def hex_to_rgb("#" <> hex), do: hex_to_rgb(hex)
  def hex_to_rgb(<<r::2-bytes, g::2-bytes, b::2-bytes>>), do: %{r: String.to_integer(r, 16), g: String.to_integer(g, 16), b: String.to_integer(b, 16)}

  def rgba_to_hex("rgba(" <> rgba), do: rgba |> String.replace(")", "") |> String.split(",") |> Enum.map(&(String.trim(&1) |> parse_number())) |> then(fn [r, g, b, _a] -> rgba_to_hex(r, g, b) end)
  def rgba_to_hex(r, g, b, _a \\ nil), do: "#" <> ( [r, g, b] |> Enum.map(&(Integer.to_string(min(&1, 255), 16) |> String.pad_leading(2, "0"))) |> Enum.join() )

  defp parse_number(str) do
    cond do
      String.contains?(str, ".") -> Float.parse(str) |> elem(0) |> trunc()
      true -> String.to_integer(str)
    end
  end

  def compare_dates(datetime_string, status) do
    today = DateTime.utc_now()
    cond do
      status == "true" -> {"rgba(36,172,32,0.8)", gettext("(Completed)")}
      compare_with_today(datetime_string, today) == :lt or compare_with_today(datetime_string, today) == :eq -> {"rgba(255,30,30,0.8)", gettext("(Overdue)")}
      compare_with_today(datetime_string, today) == :gt ->
        case string_to_date(datetime_string) do
          %DateTime{} = dt ->
            cond do
              div(DateTime.diff(dt, today), 3600) < 24 -> {"rgba(233,255,30,0.8)", gettext("(Due Soon)")}
              true -> {"rgba(230,230,230,0.8)", ""}
            end
          "" -> {"rgba(230,230,230,0.8)", ""}
        end
    end
  end

  defp compare_with_today(datetime_string, today) do
    case string_to_date(datetime_string) do
      %DateTime{} = dt -> DateTime.compare(dt, today)
      "" -> :lt
    end
  end

  def string_to_date(""), do: ""
  def string_to_date(datetime_string) do
    case String.split(datetime_string, ~r"[-\s:]") do
      [day, month, year, hour, minute] -> iso_datetime = "#{year}-#{month}-#{day}T#{hour}:#{minute}:00Z"
        case DateTime.from_iso8601(iso_datetime) do
          {:ok, datetime, _offset} -> datetime
          {:error, _reason} -> ""
        end
      _invalid_format -> ""
    end
  end
end
