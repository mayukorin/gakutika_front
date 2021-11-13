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
              expect(error).toBe("メールアドレスを正しい形式で入力してください");
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
              expect(error).toBe("メールアドレス は 255 文字以下で入力してください");
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
    });
  });
});
