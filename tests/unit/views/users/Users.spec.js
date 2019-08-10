import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import CoreuiVue from '@coreui/vue'
import Users from '@/views/users/Users'
import VueRouter from 'vue-router';

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(CoreuiVue)

describe('Users.vue', () => {
  it('has a name', () => {
    expect(Users.name).toMatch('Users')
  })
  it('has a created hook', () => {
    expect(typeof Users.data).toMatch('function')
  })
  it('sets the correct default data', () => {
    expect(typeof Users.data).toMatch('function')
    const defaultData = Users.data()
    expect(defaultData.currentPage).toBe(1)
  })
  it('is Vue instance', () => {
    const wrapper = shallowMount(Users,{
      localVue,
      router
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('is Users', () => {
    const wrapper = shallowMount(Users,{
      localVue,
      router
    })
    expect(wrapper.is(Users)).toBe(true)
  })
  test('renders correctly', () => {
    const wrapper = shallowMount(Users, {
      localVue,
      router
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have methods', () => {
    const wrapper = shallowMount(Users,{
      localVue,
      router
    })

    expect(typeof Users.methods.userLink  ).toEqual('function')
    expect(Users.methods.userLink(42)).toBe('users/42')
    expect(typeof Users.methods.rowClicked ).toEqual('function')
    expect(wrapper.vm.rowClicked({id:42})).toBeUndefined()
  })
})
