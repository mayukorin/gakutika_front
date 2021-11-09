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
        });
      });
    });
  });
});
