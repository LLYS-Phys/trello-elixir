# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     App.Repo.insert!(%App.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias App.Repo
alias App.Accounts.User
alias App.Trello.{Board, CardLabel, List, Card, Attachment, Checklist, Activity}

############################################# User Seeds ######################################

%User{
  email: "user@gmail.com",
  password: "user",
  hashed_password: Bcrypt.hash_pwd_salt("user"),
  current_password: "user"
}
|> Repo.insert!()

%User{
  email: "user2@gmail.com",
  password: "user2",
  hashed_password: Bcrypt.hash_pwd_salt("user2"),
  current_password: "user2"
}
|> Repo.insert!()

%User{
  email: "user3@gmail.com",
  password: "user3",
  hashed_password: Bcrypt.hash_pwd_salt("user3"),
  current_password: "user3"
}
|> Repo.insert!()

############################################# Trello Seeds ######################################

%CardLabel{
  name: "In progress",
  board: 0,
  color: "rgba(0,204,0,0.7)",
  user: []
}
|> Repo.insert!()

%CardLabel{
  name: "Stand By",
  board: 0,
  color: "rgba(128,128,128,0.7)",
  user: []
}
|> Repo.insert!()

%CardLabel{
  name: "High Priority",
  board: 0,
  color: "rgba(153,0,0,0.7)",
  user: []
}
|> Repo.insert!()

%CardLabel{
  name: "Medium Priority",
  board: 0,
  color: "rgba(204,102,0,0.7)",
  user: []
}
|> Repo.insert!()

%CardLabel{
  name: "Low Priority",
  board: 0,
  color: "rgba(204,204,0,0.7)",
  user: []
}
|> Repo.insert!()

%Board{
  name: "Board 1",
  bg_image: "space2.jpg",
  owners: ["user@gmail.com"],
  members: ["user2@gmail.com"],
  lists: [
    %List{
      order: 1,
      name: "List 1",
      cards: [
        %Card{
          order: 1,
          name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          description: "",
          labels: [1,3],
          dueDate: "",
          completed: "false",
          members: ["user@gmail.com", "user2@gmail.com"],
          attachments: [%Attachment{attachment_id: 1, display_text: "Google Link", type: "link", path: "google.com"}, %Attachment{attachment_id: 2, display_text: "Uploaded File", type: "file", path: "fake_invoice.pdf"}],
          checklists: [%Checklist{checklist_id: 1, name: "Test Checklist", checkboxes: [%{checkbox_id: 1, name: "checkbox 1", checked: "false"}, %{checkbox_id: 2, name: "checkbox 2", checked: "true"}, %{checkbox_id: 3, name: "checkbox 3", checked: "false"}]}],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}, %Activity{activity_id: 2, user: "user@gmail.com", action: "", comment: "Test comment", datetime: ~U[2024-11-28 18:38:00Z], edited: "false"}]
        },
        %Card{
          order: 2,
          name: "Nunc aliquam erat in justo vehicula molestie.",
          description: "Nunc aliquam erat in justo vehicula molestie. Nunc aliquam erat in justo vehicula molestie. Nunc aliquam erat in justo vehicula molestie. Nunc aliquam erat in justo vehicula molestie.",
          labels: [2],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 3,
          name: "Integer quis elit vitae erat finibus aliquet.",
          description: "Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 4,
          name: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          description: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          labels: [5],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 5,
          name: "Sed diam leo, semper ac lorem nec, placerat bibendum dolor.",
          description: "Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor.",
          labels: [4],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 6,
          name: "Nam vehicula nisi id viverra aliquet.",
          description: "Nam vehicula nisi id viverra aliquet. Nam vehicula nisi id viverra aliquet. Nam vehicula nisi id viverra aliquet. Nam vehicula nisi id viverra aliquet.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 7,
          name: "Phasellus a magna a leo molestie accumsan.",
          description: "Phasellus a magna a leo molestie accumsan. Phasellus a magna a leo molestie accumsan. Phasellus a magna a leo molestie accumsan. Phasellus a magna a leo molestie accumsan.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 8,
          name: "Phasellus eleifend facilisis convallis.",
          description: "Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 9,
          name: "Suspendisse vel malesuada elit.",
          description: "Suspendisse vel malesuada elit. Suspendisse vel malesuada elit. Suspendisse vel malesuada elit. Suspendisse vel malesuada elit.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 10,
          name: "Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae.",
          description: "Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae. Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae. Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae. Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 11,
          name: "Aenean accumsan justo lorem, ac aliquet elit pharetra vel.",
          description: "Aenean accumsan justo lorem, ac aliquet elit pharetra vel. Aenean accumsan justo lorem, ac aliquet elit pharetra vel. Aenean accumsan justo lorem, ac aliquet elit pharetra vel. Aenean accumsan justo lorem, ac aliquet elit pharetra vel.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        }
      ]
    },
    %List{
      order: 2,
      name: "List 2",
      cards: [
        %Card{
          order: 1,
          name: "Duis dapibus sem vel faucibus iaculis.",
          description: "Duis dapibus sem vel faucibus iaculis. Duis dapibus sem vel faucibus iaculis. Duis dapibus sem vel faucibus iaculis. Duis dapibus sem vel faucibus iaculis.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        }
      ]
    },
    %List{
      order: 3,
      name: "List 3",
      cards: [
        %Card{
          order: 1,
          name: "Integer quis elit vitae erat finibus aliquet.",
          description: "Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 2,
          name: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          description: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 3,
          name: "Sed diam leo, semper ac lorem nec, placerat bibendum dolor.",
          description: "Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 4,
          name: "Nam vehicula nisi id viverra aliquet.",
          description: "Nam vehicula nisi id viverra aliquet. Nam vehicula nisi id viverra aliquet. Nam vehicula nisi id viverra aliquet. Nam vehicula nisi id viverra aliquet.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 5,
          name: "Phasellus a magna a leo molestie accumsan.",
          description: "Phasellus a magna a leo molestie accumsan. Phasellus a magna a leo molestie accumsan. Phasellus a magna a leo molestie accumsan. Phasellus a magna a leo molestie accumsan.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 6,
          name: "Phasellus eleifend facilisis convallis.",
          description: "Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 7,
          name: "Suspendisse vel malesuada elit.",
          description: "Suspendisse vel malesuada elit. Suspendisse vel malesuada elit. Suspendisse vel malesuada elit. Suspendisse vel malesuada elit.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        }
      ]
    },
    %List{
      order: 4,
      name: "List 4",
      cards: [
        %Card{
          order: 1,
          name: "Phasellus eleifend facilisis convallis.",
          description: "Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis. Phasellus eleifend facilisis convallis.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 2,
          name: "Suspendisse vel malesuada elit.",
          description: "Suspendisse vel malesuada elit. Suspendisse vel malesuada elit. Suspendisse vel malesuada elit. Suspendisse vel malesuada elit.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 3,
          name: "Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae.",
          description: "Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae. Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae. Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae. Quisque pulvinar purus lorem, sed vestibulum purus molestie vitae.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 4,
          name: "Aenean accumsan justo lorem, ac aliquet elit pharetra vel.",
          description: "Aenean accumsan justo lorem, ac aliquet elit pharetra vel. Aenean accumsan justo lorem, ac aliquet elit pharetra vel. Aenean accumsan justo lorem, ac aliquet elit pharetra vel. Aenean accumsan justo lorem, ac aliquet elit pharetra vel.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        }
      ]
    },
    %List{
      order: 5,
      name: "List 5",
      cards: [
        %Card{
          order: 1,
          name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 2,
          name: "Nunc aliquam erat in justo vehicula molestie.",
          description: "Nunc aliquam erat in justo vehicula molestie. Nunc aliquam erat in justo vehicula molestie. Nunc aliquam erat in justo vehicula molestie. Nunc aliquam erat in justo vehicula molestie.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 3,
          name: "Integer quis elit vitae erat finibus aliquet.",
          description: "Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet. Integer quis elit vitae erat finibus aliquet.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 4,
          name: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          description: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 5,
          name: "Sed diam leo, semper ac lorem nec, placerat bibendum dolor.",
          description: "Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor. Sed diam leo, semper ac lorem nec, placerat bibendum dolor.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        },
        %Card{
          order: 6,
          name: "Nam vehicula nisi id viverra aliquet.",
          description: "Nam vehicula nisi id viverra aliquet.",
          labels: [],
          dueDate: "",
          completed: "false",
          members: [],
          attachments: [],
          checklists: [],
          activity: [%Activity{activity_id: 1, user: "user@gmail.com", action: "create", comment: "", datetime: ~U[2024-11-28 17:38:00Z], edited: "false"}]
        }
      ]
    }
  ]
}
|> Repo.insert!()
