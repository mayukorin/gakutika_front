import SignUpForm from "@/components/molecules/SignUpForm.vue";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";

describe("SignUpForm.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  describe("プロパティ", () => {
    describe("バリデーション", () => {
      describe("name", () => {
        describe("required", () => {
          describe("何も入力されていない", () => {
            it("nameがinvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ name: " " });
              await wrapper.vm.$refs.observer.validate();
              const error = wrapper.vm.$refs.usernameProvider.errors[0];
              expect(error).toBe("ユーザ名 を入力してください");
            });
          });
          describe("入力されている", () => {
            it("nameがvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ name: "aaaaaa" });
              await wrapper.vm.$refs.observer.validate();
              const errorCnt = wrapper.vm.$refs.usernameProvider.errors.length;
              expect(errorCnt).toBe(0);
            });
          });
        });
        describe("max", () => {
          describe("nameが50文字より大きい", () => {
            it("nameがinvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              let longName = "";
              for (let i = 0; i < 51; i++) longName += "a";
              await wrapper.setData({ name: longName });
              await wrapper.vm.$refs.observer.validate();
              const error = wrapper.vm.$refs.usernameProvider.errors[0];
              expect(error).toBe("ユーザ名 は 50 文字以下で入力してください");
            });
          });
          describe("nameが50文字以下", () => {
            it("nameがvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              let safeName = "";
              for (let i = 0; i < 50; i++) safeName += "a";
              await wrapper.setData({ name: safeName });
              await wrapper.vm.$refs.observer.validate();
              const errorCnt = wrapper.vm.$refs.usernameProvider.errors.length;
              expect(errorCnt).toBe(0);
            });
          });
        });
      });
      describe("email", () => {
        describe("required", () => {
          describe("何も入力されていない", () => {
            it("emailがinvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ email: " " });
              await wrapper.vm.$refs.observer.validate();
              const error = wrapper.vm.$refs.emailProvider.errors[0];
              expect(error).toBe("メールアドレス を入力してください");
            });
          });
          describe("入力されている", () => {
            it("emailがvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ email: "test@example.com" });
              await wrapper.vm.$refs.observer.validate();
              const errorCnt = wrapper.vm.$refs.emailProvider.errors.length;
              expect(errorCnt).toBe(0);
            });
          });
        });
        describe("email", () => {
          describe("emailの形式があっていない", () => {
            it("emailがinvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ email: "aaaaaaa" });
              await wrapper.vm.$refs.observer.validate();
              const error = wrapper.vm.$refs.emailProvider.errors[0];
              expect(error).toBe(
                "メールアドレスを正しい形式で入力してください"
              );
            });
          });
          describe("emailの形式が正しい", () => {
            it("emailがvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ email: "test@example.com" });
              await wrapper.vm.$refs.observer.validate();
              const errorCnt = wrapper.vm.$refs.emailProvider.errors.length;
              expect(errorCnt).toBe(0);
            });
          });
        });
        describe("max", () => {
          describe("emailが255文字より大きい", () => {
            it("emailがinvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              let longEmail = "";
              for (let i = 0; i < 300; i++) longEmail += "a";
              longEmail += "@example.com";
              await wrapper.setData({ email: longEmail });
              await wrapper.vm.$refs.observer.validate();
              const error = wrapper.vm.$refs.emailProvider.errors[0];
              expect(error).toBe(
                "メールアドレス は 255 文字以下で入力してください"
              );
            });
          });
          describe("emailの形式が正しい", () => {
            it("emailがvalidであること", async () => {
              const wrapper = mount(SignUpForm, {
                localVue,
                vuetify,
              });
              await wrapper.setData({ email: "test@example.com" });
              await wrapper.vm.$refs.observer.validate();
              const errorCnt = wrapper.vm.$refs.emailProvider.errors.length;
              expect(errorCnt).toBe(0);
            });
          });
        });
      });

      describe("password", () => {
        describe("required", () => {
          it("何も入力されていない", async () => {
            const wrapper = mount(SignUpForm, {
              localVue,
              vuetify,
            });
            await wrapper.setData({ password: " " });
            await wrapper.vm.$refs.observer.validate();
            const error = wrapper.vm.$refs.passwordProvider.errors[0];
            expect(error).toBe("パスワード を入力してください");
          });
          it("入力されている", async () => {
            const wrapper = mount(SignUpForm, {
              localVue,
              vuetify,
            });
            await wrapper.setData({ password: "abcabcabc" });
            await wrapper.vm.$refs.observer.validate();
            const errorCnt = wrapper.vm.$refs.passwordProvider.errors.length;
            expect(errorCnt).toBe(0);
          });
        });
        describe("min", () => {
          it("passwordが6文字未満", async () => {
            const wrapper = mount(SignUpForm, {
              localVue,
              vuetify,
            });
            await wrapper.setData({ password: "abcbb" });
            await wrapper.vm.$refs.observer.validate();
            const error = wrapper.vm.$refs.passwordProvider.errors[0];
            expect(error).toBe("パスワード は 6 文字以上で入力してください");
          });
          it("passwordが6文字以上", async () => {
            const wrapper = mount(SignUpForm, {
              localVue,
              vuetify,
            });
            await wrapper.setData({ password: "abcbbb" });
            await wrapper.vm.$refs.observer.validate();
            const errorCnt = wrapper.vm.$refs.passwordProvider.errors.length;
            expect(errorCnt).toBe(0);
          });
        });
      });

      describe("password_confirmation", () => {
        describe("required", () => {
          it("何も入力されていない", async () => {
            const wrapper = mount(SignUpForm, {
              localVue,
              vuetify,
            });
            await wrapper.setData({ password_confirmation: " " });
            await wrapper.vm.$refs.observer.validate();
            const error =
              wrapper.vm.$refs.passwordConfirmationProvider.errors[0];
            expect(error).toBe("パスワード（再入力） を入力してください");
          });
          it("入力されている", async () => {
            const wrapper = mount(SignUpForm, {
              localVue,
              vuetify,
            });
            await wrapper.setData({
              password: "abcabcabc",
              password_confirmation: "abcabcabc",
            });
            await wrapper.vm.$refs.observer.validate();
            const errorCnt =
              wrapper.vm.$refs.passwordConfirmationProvider.errors.length;
            expect(errorCnt).toBe(0);
          });
        });
      });
    });
  });
});
