import { View, useTheme } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import { I18n } from "aws-amplify/utils"
import { translations } from "@aws-amplify/ui-react"

I18n.setLanguage("ja")
I18n.putVocabularies(translations)
I18n.putVocabularies({
    ja:{
        "Nickname":"ユーザ名"
    }
})

const customComponents = {
    Header() {
      const { tokens } = useTheme()
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <img
            alt="logo"
            src="/NSK_logo.png"
            width={300}
            height={0}
            style={{ height: "auto" }}
          />
        </View>
      )
    }
  }

const formFields = {
    signUp: {
        nickname: {
            placeholder: "ユーザー名を入力してください",
            order:1
        },
        email: {
            placeholder: "メールアドレスを入力してください",
            order:2
        },
        password: {
            placeholder: "パスワードを入力してください",
            order:3
        },
        confirm_password: {
            placeholder: "パスワードを再入力してください",
            order:4
        },
        // チェックしないと登録できないようにしたかったが、何か変な見た目になる。
        // terms:{
        //     type: "checkbox",
        //     label: "利用規約に同意する",
        //     required: true,
        //     order:5
        // }
    },
}

export { customComponents, formFields }